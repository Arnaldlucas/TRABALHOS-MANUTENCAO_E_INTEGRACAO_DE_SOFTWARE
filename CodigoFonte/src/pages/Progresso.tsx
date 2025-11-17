import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp, // <-- 1. IMPORTADO
} from "firebase/firestore";
import {
  BarChart,
  Loader,
  AlertCircle,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// <-- 2. INTERFACES ADICIONADAS
interface ErrorStateProps {
  message: string;
}

interface QuizProgress {
  id: string;
  score: number;
  percentage: number;
  totalQuestions: number;
  completedAt: Timestamp;
}

// Componentes de UI para manter o JSX principal limpo
const LoadingState = () => (
  <div className="flex justify-center items-center py-16">
    <Loader className="animate-spin text-green-600" size={32} />
  </div>
);

// <-- 3. PROPS CORRIGIDAS
const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-red-500">
    <AlertCircle size={32} />
    <p className="mt-4 text-center">{message}</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 px-6 bg-white rounded-xl border">
    <h3 className="text-lg font-semibold text-gray-800">
      Nenhum quiz realizado ainda!
    </h3>
    <p className="text-gray-500 mt-2">
      Comece um quiz para ver seu progresso aqui.
    </p>
    <Link
      to="/quiz"
      className="mt-4 inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
    >
      Começar um Quiz
    </Link>
  </div>
);

export default function Progresso() {
  const { currentUser } = useAuth();
  // <-- 3. ESTADOS CORRIGIDOS
  const [quizHistory, setQuizHistory] = useState<QuizProgress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Busca o histórico de progresso do usuário no Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const progressCollectionRef = collection(
          db,
          "users",
          currentUser.uid,
          "quizProgress"
        );
        const q = query(progressCollectionRef, orderBy("completedAt", "desc"));
        const querySnapshot = await getDocs(q);

        // <-- 4. TYPE CASTING APLICADO
        const historyData = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as QuizProgress)
        ); // Diz ao TS que este objeto é um QuizProgress

        setQuizHistory(historyData);
      } catch (err) {
        console.error("Erro ao buscar progresso:", err);
        setError("Não foi possível carregar seu histórico. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [currentUser]);

  // 2. Calcula as estatísticas de forma otimizada com useMemo.
  // (Agora o TS sabe o que é 'quiz.score' e 'quiz.percentage')
  const stats = useMemo(() => {
    if (quizHistory.length === 0) {
      return { quizzesFeitos: 0, termosAprendidos: 0, percentualMedio: 0 };
    }
    const quizzesFeitos = quizHistory.length;
    const termosAprendidos = quizHistory.reduce(
      (total, quiz) => total + quiz.score,
      0
    );
    const totalPercentage = quizHistory.reduce(
      (total, quiz) => total + quiz.percentage,
      0
    );
    const percentualMedio = Math.round(totalPercentage / quizzesFeitos);

    return { quizzesFeitos, termosAprendidos, percentualMedio };
  }, [quizHistory]);

  const renderContent = () => {
    if (loading) return <LoadingState />;
    // (O TS agora sabe que 'error' é 'string' ou 'null', então esta checagem funciona)
    if (error) return <ErrorState message={error} />;
    if (quizHistory.length === 0) return <EmptyState />;

    return (
      <>
        {/* Métricas Agregadas */}
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">
              Quizzes Concluídos
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.quizzesFeitos}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">
              Total de Acertos
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.termosAprendidos}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">
              Desempenho Médio
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.percentualMedio}%
            </p>
          </div>
        </div>

        {/* Histórico Detalhado */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Histórico de Atividades</h2>
          <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
            {quizHistory.map(
              (
                quiz // (O TS agora sabe que 'quiz' é 'QuizProgress')
              ) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-3 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={
                        quiz.percentage >= 70
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    />
                    <div>
                      <p className="font-semibold">Quiz de Fundamentos</p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          quiz.completedAt.seconds * 1000
                        ).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {quiz.score}/{quiz.totalQuestions}
                    </p>
                    <p className="text-sm text-gray-500">{quiz.percentage}%</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BarChart className="text-green-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Seu Progresso</h1>
        </div>
        {renderContent()}
        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-green-800 text-white font-semibold rounded hover:bg-green-900 transition"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
