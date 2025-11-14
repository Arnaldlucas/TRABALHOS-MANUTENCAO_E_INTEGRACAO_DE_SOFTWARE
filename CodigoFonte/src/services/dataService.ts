// ARQUIVO: CodigoFonte/src/services/dataService.ts (Migrado)

import { db } from "../pages/firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp, // Importe o tipo Timestamp
  DocumentData, // Importe tipos genéricos do Firestore
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth"; // Importe o tipo User do Auth

// --- 1. DEFINIÇÃO DAS INTERFACES (Nossos Modelos de Dados) ---

// Perfil do usuário no Firestore
export interface UserProfile {
  name: string;
  email: string;
  createdAt: Timestamp;
}

// Um termo do glossário
export interface Term {
  id: string;
  term: string;
  translation: string;
  description: string;
}

// O resultado de um quiz salvo
export interface QuizResult {
  id?: string; // O ID do documento
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Timestamp; // Sempre usaremos Timestamp do Firestore
  quizId: string;
}

// --- 2. FUNÇÕES DO SERVICE TIPADAS ---

/**
 * Busca o perfil de um usuário no Firestore.
 */
const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;
  
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile; // Afirma que os dados batem com a interface
  } else {
    console.warn("Nenhum perfil de usuário encontrado no Firestore para o UID:", uid);
    return null;
  }
};

/**
 * Cria o documento de perfil para um novo usuário (usado no Registro).
 * Agora recebe o objeto User completo para garantir os dados corretos.
 */
const createUserProfile = (user: User): Promise<void> => {
  const userDocRef = doc(db, "users", user.uid);
  
  const newUserProfile: UserProfile = {
    name: user.displayName || "Novo Usuário",
    email: user.email!, // O '!' afirma ao TS que o email não será nulo
    createdAt: Timestamp.now(), // Usa o Timestamp do servidor
  };
  
  return setDoc(userDocRef, newUserProfile);
};

/**
 * Busca uma lista paginada de termos do glossário.
 */
const fetchTerms = async (
  pageSize: number,
  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{ terms: Term[], lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  
  const termsCollection = collection(db, "terms");
  
  let q;
  if (lastVisible) {
    q = query(
      termsCollection,
      orderBy("term"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  } else {
    q = query(termsCollection, orderBy("term"), limit(pageSize));
  }

  const documentSnapshots = await getDocs(q);
  
  const termsData = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Term));
  
  const newLastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
  
  return { terms: termsData, lastDoc: newLastDoc };
};

/**
 * Busca o histórico de quizzes de um usuário.
 */
const fetchProgressSummary = async (uid: string): Promise<QuizResult[]> => {
  if (!uid) return [];
  
  const progressCollectionRef = collection(db, "users", uid, "quizProgress");
  const q = query(progressCollectionRef, orderBy("completedAt", "desc"));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as QuizResult));
};

// ... (as funções fetchQuizQuestions e saveQuizResult foram omitidas
//      do, mas elas seriam migradas aqui também)

/**
 * O 'dataService' (Facade) exporta todas as funções tipadas.
 */
export const dataService = {
  fetchUserProfile,
  createUserProfile,
  fetchTerms,
  fetchProgressSummary,
  // (outras funções iriam aqui)
};