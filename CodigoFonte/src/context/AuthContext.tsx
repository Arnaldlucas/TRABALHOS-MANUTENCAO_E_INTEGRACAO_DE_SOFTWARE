// ARQUIVO MODIFICADO: src/context/AuthContext.tsx

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
  User,
} from "firebase/auth";
import { auth } from "../pages/firebase-config";

// --- REATORAÇÃO ---
// A lógica de acesso direto ao Firestore (db, doc, setDoc) foi removida.
// Este contexto agora delega todas as operações de banco de dados
// para o 'dataService', implementando um Padrão Repository (Facade).
// Isso desacopla a autenticação da implementação do banco de dados.
import { dataService } from "../services/dataService";

// Interface que define a "forma" do nosso contexto para o TypeScript
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Fornece um valor padrão "seguro" para o contexto.
// Isso previne erros em consumidores que tentam acessar o contexto
// sem um Provider superior e melhora a inferência de tipo.
const defaultAuthContextValue: AuthContextType = {
  currentUser: null,
  loading: true,
  login: () => Promise.reject(new Error("Função login não inicializada")),
  register: () => Promise.reject(new Error("Função register não inicializada")),
  logout: () => Promise.reject(new Error("Função logout não inicializada")),
};

export const AuthContext = createContext<AuthContextType>(
  defaultAuthContextValue
);

// Tipo para as props do nosso Provider
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * O AuthProvider é o componente "dono" do estado de autenticação.
 * Ele gerencia o 'currentUser' e expõe as funções de 'login', 'register' e 'logout'
 * para qualquer componente filho na árvore React.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Registra um novo usuário.
   * Esta função orquestra as três etapas do registro:
   * 1. Criar o usuário no Firebase Auth (serviço de autenticação).
   * 2. Atualizar o 'displayName' no perfil do Firebase Auth.
   * 3. Delegar a criação do documento de perfil no Firestore para o 'dataService'.
   *
   * Note como esta função está desacoplada do Firestore. Ela não sabe
   * *como* o perfil é salvo, apenas *que* ele deve ser salvo.
   */
  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      // Etapa 1: Cria o usuário no serviço de Autenticação
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Etapa 2: Atualiza o perfil de autenticação (displayName).
      // Isso é separado do documento do Firestore e é usado pelo próprio Firebase Auth.
      await updateProfile(user, {
        displayName: name,
      });

      // --- REATORAÇÃO ---
      // Etapa 3: Delega a criação do documento do Firestore para o dataService.
      // Este componente não tem mais conhecimento sobre 'db', 'doc' ou 'setDoc'.
      // Isso adere ao Princípio da Responsabilidade Única (SRP).
      await dataService.createUserProfile(user.uid, name, email);

      return userCredential;
    } catch (error) {
      // O erro é repassado para a UI (ex: página de Registro)
      // para que ela possa exibir uma mensagem amigável.
      console.error("Erro detalhado no registro (AuthContext):", error);
      throw error;
    }
  }

  /**
   * Executa o login de um usuário existente.
   */
  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Desconecta o usuário atual.
   */
  function logout(): Promise<void> {
    return signOut(auth);
  }

  // Este efeito é o núcleo do provedor.
  // Ele estabelece um "ouvinte" (listener) em tempo real para o estado
  // de autenticação do Firebase.
  useEffect(() => {
    // onAuthStateChanged dispara imediatamente com o estado atual (ex: usuário logado)
    // e novamente sempre que o estado de login/logout muda.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Sinaliza que o carregamento inicial foi concluído.
      setLoading(false);
    });

    // A função de limpeza (return) é crucial.
    // Ela remove o "ouvinte" quando o AuthProvider é desmontado,
    // evitando vazamentos de memória (memory leaks).
    return unsubscribe;
  }, []); // O array vazio [] garante que este efeito execute apenas uma vez (na montagem).

  // O 'value' é o objeto que será exposto para todos os
  // componentes consumidores do contexto.
  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/*
       * Só renderiza os componentes filhos (a aplicação) *após*
       * o primeiro 'onAuthStateChanged' ter retornado (loading = false).
       * Isso previne "flickers" na UI e garante que as rotas protegidas
       * tenham o 'currentUser' correto antes de tentar renderizar.
       */}
      {!loading && children}
    </AuthContext.Provider>
  );
}