// ARQUIVO: CodigoFonte/src/pages/DashBoard.tsx
// (Versão final, corrigida para funcionar com o 'pt-20' do Layout.tsx)

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useWordOfDay } from "../features/dashboard/useWordOfDay";
import { useSpacedRepetition } from "../features/quiz/useSpacedRepetition";

// Firebase
import { db } from "./firebase-config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Ícones
import {
  Loader,
  BookOpen,
  Repeat,
  Lightbulb,
} from "lucide-react";

export default function DashBoard() {
  const { currentUser } = useAuth();

  // --- Estados de Dados ---
  const [userName, setUserName] = useState("Usuário");
  const [quizzesFeitos, setQuizzesFeitos] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);

  const {
    palavra,
    loading: loadingWord,
    error: errorWord,
  } = useWordOfDay();

  const {
    termosParaRevisar,
    loading: loadingRepetition,
    error: errorRepetition,
  } = useSpacedRepetition();

  // --- Efeitos de Busca de Dados ---
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoadingUser(false);
        return;
      }
      setLoadingUser(true);
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
        const progressCollectionRef = collection(
          db, "users", currentUser.uid, "quizProgress"
        );
        const querySnapshot = await getDocs(progressCollectionRef);
        setQuizzesFeitos(querySnapshot.size);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserData();
  }, [currentUser]);

  // --- Lógica de Renderização ---
  const isLoading = loadingUser || loadingWord || loadingRepetition;

  const getSmartAction = () => {
    if (termosParaRevisar > 0) {
      return {
        to: "/quiz?mode=review",
        text: `Revisar ${termosParaRevisar} Termos Agora`,
        icon: <Repeat className="w-5 h-5 mr-2" />,
      };
    }
    return {
      to: "/termos",
      text: "Aprender Novos Termos",
      icon: <BookOpen className="w-5 h-5 mr-2" />,
    };
  };

  const smartAction = getSmartAction();
  const totalTermsGoal = 50;
  const progressPercentage = Math.min(
    (quizzesFeitos / totalTermsGoal) * 100,
    100
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-full overflow-hidden">
      
      {/* O FUNDO "WOW" (Fica atrás do conteúdo) */}
      <div className="blob-container">
        <div 
          className="blob bg-blue-300 w-96 h-96 top-20 -left-10"
          style={{ animation: 'float-blob 20s ease-in-out infinite' }}
        ></div>
        <div 
          className="blob bg-purple-300 w-80 h-80 top-40 right-20"
          style={{ animation: 'float-blob 15s ease-in-out infinite reverse' }}
        ></div>
        <div 
          className="blob bg-indigo-300 w-72 h-72 bottom-10 left-10"
          style={{ animation: 'float-blob 18s ease-in-out infinite' }}
        ></div>
      </div>

      
      {/* O CONTEÚDO (Fica na frente do fundo)
          'z-10' o coloca na frente.
          'pt-20' do Layout.tsx já cuida da "falha".
          Adicionamos 'pb-24' para espaço no final.
      */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        
        {/* Seção de Boas-vindas */}
        <section className="text-left mb-12">
          <h1 className="text-5xl font-extrabold mb-3 text-gray-900">
            Bem-vindo, {userName.split(" ")[0]}!
          </h1>
          <p className="text-gray-700 text-lg">
            Pronto para sua próxima lição?
          </p>
        </section>

        {/* Card de Progresso (Efeito "Vidro Fosco") */}
        <section className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Progresso Total
            </h3>
            <span className="text-sm font-bold text-blue-600">
              {quizzesFeitos} / {totalTermsGoal} Termos
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {errorRepetition && (
            <p className="text-red-500 text-sm mt-3">
              Não foi possível carregar seu progroso de revisão.
            </p>
          )}
        </section>

        {/* Card "Palavra do Dia" (Efeito "Vidro Fosco") */}
        <section className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Palavra do Dia
            </h2>
          </div>
          {errorWord && (
            <p className="text-red-500">Erro ao carregar a palavra.</p>
          )}
          {palavra && (
            <div>
              <h3 className="text-3xl font-bold text-blue-700 mb-2">
                {palavra.term}
              </h3>
              <p className="text-xl text-gray-700 mb-1">
                {palavra.translation}
              </p>
              <p className="text-gray-600 text-sm">{palavra.description}</p>
            </div>
          )}
        </section>

        {/* Botão de Ação e Links Secundários */}
        <section className="mt-12 text-center">
          <Link
            to={smartAction.to}
            className="flex items-center justify-center w-full max-w-md mx-auto px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:-translate-y-1"
          >
            {smartAction.icon}
            {smartAction.text}
          </Link>

          <div className="mt-6 flex justify-center gap-6">
            <Link
              to="/termos"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Ver Glossário
            </Link>
            <Link
              to="/progresso"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Ver Progresso
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}