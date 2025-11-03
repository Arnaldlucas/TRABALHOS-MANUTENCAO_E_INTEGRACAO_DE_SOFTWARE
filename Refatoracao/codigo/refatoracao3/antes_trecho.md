# ANTES - trecho original (Termos.jsx)

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { BookOpenText, Search, Loader, AlertCircle } from "lucide-react";

const PAGE_SIZE = 9; // Quantos termos carregar por vez

export default function Termos() {
  const [terms, setTerms] = useState([]); // Armazenará os termos carregados
  const [loading, setLoading] = useState(true); // Loading inicial da página
  const [error, setError] = useState(null);

  // 2. Novos estados para controlar a paginação
  const [lastVisible, setLastVisible] = useState(null); // Guarda o "cursor" para o último documento
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading do botão "Carregar Mais"
  const [hasMore, setHasMore] = useState(true); // Indica se ainda há mais termos para carregar

  // 3. Efeito para buscar a PRIMEIRA página de dados
  useEffect(() => {
    const fetchInitialTerms = async () => {
      try {
        const firstBatch = query(
          collection(db, "terms"),
          orderBy("term"),
          limit(PAGE_SIZE)
        );
        const documentSnapshots = await getDocs(firstBatch);

        const termsData = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTerms(termsData);
        // Guarda o último documento da leva para usar como ponto de partida da próxima busca
        const lastDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lastDoc);

        // Se o número de documentos for menor que o tamanho da página, não há mais o que carregar
        if (termsData.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Erro ao buscar termos:", err);
        setError(
          "Não foi possível carregar os termos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTerms();
  }, []);

  // 4. Função para carregar as próximas páginas
  const handleLoadMore = async () => {
    if (!lastVisible) return; // Não faz nada se não tiver um ponto de partida

    setIsLoadingMore(true);
    try {
      const nextBatch = query(
        collection(db, "terms"),
        orderBy("term"),
        startAfter(lastVisible), // Começa a busca DEPOIS do último documento que vimos
        limit(PAGE_SIZE)
      );

      const documentSnapshots = await getDocs(nextBatch);
      const newTermsData = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Adiciona os novos termos à lista existente
      setTerms((prevTerms) => [...prevTerms, ...newTermsData]);

      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (newTermsData.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Erro ao carregar mais termos:", err);
      setError("Ocorreu um erro ao carregar mais termos.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (loading) {
    /* ... JSX do loading ... */
  }
  if (error) {
    /* ... JSX do erro ... */
  }

  ...

  # ANTES - trecho original (dataService.js)

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

...
  
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

