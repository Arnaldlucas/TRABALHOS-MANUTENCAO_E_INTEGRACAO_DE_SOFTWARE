// ARQUIVO NOVO: src/services/dataService.js

// Importamos a instância 'db' do Firestore. Este é o único arquivo
// no diretório 'src' que deve ter permissão para importar 'db' diretamente.
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
} from "firebase/firestore";

/**
 * Busca o documento de perfil de um usuário no Firestore.
 * Abstrai a lógica de 'getDoc' e trata o caso de um documento inexistente.
 *
 * @param {string} uid - O ID do usuário (vindo do Firebase Auth).
 * @returns {Promise<object | null>} Os dados do perfil ou null se o documento não for encontrado.
 */
const fetchUserProfile = async (uid) => {
  if (!uid) {
    console.warn("fetchUserProfile chamado sem UID.");
    return null;
  }
  
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // É um cenário válido um usuário estar autenticado (no Auth) mas
    // ainda não ter um documento de perfil (no Firestore), especialmente
    // se o processo de registro for interrompido.
    console.warn("Nenhum perfil de usuário encontrado no Firestore para o UID:", uid);
    return null;
  }
};

/**
 * Cria o documento de perfil para um novo usuário no Firestore.
 * Esta função é chamada durante o registro para desacoplar a criação
 * de usuário no AuthContext da lógica de banco de dados.
 *
 * @param {string} uid - O UID do usuário (fornecido pelo Firebase Auth).
 * @param {string} name - O nome do usuário.
 * @param {string} email - O e-mail do usuário.
 * @returns {Promise<void>} Uma promessa que resolve quando o documento é escrito.
 */
const createUserProfile = (uid, name, email) => {
  const userDocRef = doc(db, "users", uid);
  return setDoc(userDocRef, {
    name: name,
    email: email,
    createdAt: new Date(),
  });
};

/**
 * Busca uma lista paginada de termos do glossário.
 * Encapsula a lógica de paginação do Firestore (orderBy, limit, startAfter).
 *
 * @param {number} pageSize - O número de termos a serem buscados por página.
 * @param {object | null} lastVisible - O último documento da página anterior, usado como cursor. Null para a primeira página.
 * @returns {Promise<{terms: Array<object>, lastDoc: object | null}>} Um objeto contendo a lista de termos e o cursor para a próxima página.
 */
const fetchTerms = async (pageSize, lastVisible = null) => {
  const termsCollection = collection(db, "terms");
  
  // Constrói a query baseada na presença de um cursor de paginação.
  const q = lastVisible
    ? query(
        termsCollection,
        orderBy("term"),
        startAfter(lastVisible),
        limit(pageSize)
      )
    : query(
        termsCollection,
        orderBy("term"),
        limit(pageSize)
      );

  const documentSnapshots = await getDocs(q);
  const termsData = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  // O último documento é retornado para ser usado como 'lastVisible' na próxima chamada.
  const newLastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
  
  return { terms: termsData, lastDoc: newLastDoc };
};

/**
 * Busca todas as perguntas para um quiz específico.
 *
 * TODO: O ID 'fundamentos' está fixo. Em uma futura iteração,
 * esta função deve receber um 'quizId' como parâmetro.
 *
 * @returns {Promise<Array<object>>} Uma lista de objetos de pergunta.
 */
const fetchQuizQuestions = async () => {
  // O caminho 'quizzes/fundamentos/questions' está centralizado aqui.
  // Se ele mudar, só precisamos atualizar este local.
  const questionsQuery = query(collection(db, "quizzes", "fundamentos", "questions"));
  const querySnapshot = await getDocs(questionsQuery);
  
  if (querySnapshot.empty) {
    console.error("Nenhuma pergunta de quiz encontrada em 'quizzes/fundamentos/questions'.");
    return [];
  }

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Salva o resultado de um quiz na subcoleção 'quizProgress' de um usuário.
 *
 * @param {string} uid - O ID do usuário.
 * @param {object} result - O objeto contendo o resultado (score, total, percentage, etc.).
 * @returns {Promise<void>}
 */
const saveQuizResult = (uid, result) => {
  if (!uid || !result) {
    throw new Error("UID do usuário e resultado são obrigatórios para salvar o quiz.");
  }

  // Usamos o timestamp como ID do documento para garantir que sejam únicos
  // e possam ser ordenados cronologicamente.
  const progressDocRef = doc(
    db,
    "users",
    uid,
    "quizProgress",
    Date.now().toString()
  );
  
  // Adiciona um timestamp de servidor ao resultado para consistência.
  const resultWithTimestamp = {
    ...result,
    completedAt: result.completedAt || new Date(), // Garante que temos um timestamp
  };

  return setDoc(progressDocRef, resultWithTimestamp);
};

/**
 * Busca o histórico de quizzes de um usuário, ordenados do mais recente para o mais antigo.
 *
 * @param {string} uid - O ID do usuário.
 * @returns {Promise<Array<object>>} Uma lista de resultados de quizzes.
 */
const fetchProgressSummary = async (uid) => {
  if (!uid) return [];
  
  const progressCollectionRef = collection(db, "users", uid, "quizProgress");
  
  // A ordenação por 'completedAt' 'desc' é importante para mostrar
  // o progresso mais recente primeiro na UI.
  const q = query(progressCollectionRef, orderBy("completedAt", "desc"));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

/**
 * Ponto de entrada do serviço de dados (Facade).
 * * Agrupamos todas as funções em um único objeto exportado.
 * Isso torna as importações nos componentes React mais limpas
 * (ex: `import { dataService } from '...'`) e reforça o padrão Facade,
 * onde a aplicação interage com este único "ponto de contato".
 */
export const dataService = {
  fetchUserProfile,
  createUserProfile,
  fetchTerms,
  fetchQuizQuestions,
  saveQuizResult,
  fetchProgressSummary,
};