import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase-config";
import { collection, getDocs, query, doc, setDoc } from "firebase/firestore";
import { 
  HelpCircle, 
  Loader, 
  AlertCircle, 
  Check, 
  X, 
  Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleExit = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, "quizzes", "fundamentos", "questions"));
        const querySnapshot = await getDocs(q);
        const questionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (questionsData.length === 0) {
          setError(
            "Nenhuma pergunta encontrada para este quiz. Verifique a base de dados."
          );
        } else {
          setQuestions(questionsData);
        }
      } catch (err) {
        console.error("Erro ao buscar perguntas do quiz:", err);
        setError("Não foi possível carregar o quiz. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].answer) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
      saveQuizResults();
    }
  };

  const saveQuizResults = async () => {
    if (!currentUser) return;
    try {
      const quizResult = {
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        completedAt: new Date(),
        quizId: "fundamentos",
      };
      const progressRef = doc(
        db,
        "users",
        currentUser.uid,
        "quizProgress",
        Date.now().toString()
      );
      await setDoc(progressRef, quizResult);
      console.log("Progresso salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar progresso:", err);
    }
  };

  // =========================================================================
  // LÓGICA DE RENDERIZAÇÃO REESTRUTURADA E ROBUSTA
  // =========================================================================

  // 1. Primeiro, tratamos os estados de carregamento e erro.
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-purple-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <AlertCircle size={40} />
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  // 2. Em seguida, tratamos o estado final do quiz.
  if (quizFinished) {
    return (
      <div className="flex flex-col justify-center items-center text-center min-h-screen px-6">
        <Award className="text-yellow-500 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Quiz Finalizado!</h1>
        <p className="text-xl text-gray-700">Seu resultado foi:</p>
        <p className="text-5xl font-bold my-4 text-purple-600">
          {score} / {questions.length}
        </p>
        <p className="text-2xl font-semibold text-gray-800">
          ({Math.round((score / questions.length) * 100)}%)
        </p>
        <Link
          to="/dashboard"
          className="mt-8 px-6 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
        >
          Voltar ao Início
        </Link>
      </div>
    );
  }

  // 3. Somente se nenhuma das condições acima for atendida, tentamos acessar a pergunta atual.
  // Isso garante que `questions` não está vazio e que o quiz não terminou.
  const currentQuestion = questions[currentQuestionIndex];

  // 4. Uma guarda final para um caso de borda improvável.
  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <AlertCircle size={40} />
        <p className="mt-4">Ocorreu um erro ao carregar a pergunta.</p>
      </div>
    );
  }

  // 5. Finalmente, renderizamos a UI do quiz.
  return (
    <div className="relative min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <button
        onClick={handleExit}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Sair do Quiz"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="text-purple-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Quiz Interativo</h1>
        </div>
        <p className="text-gray-500 mb-8">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </p>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {currentQuestion.question}
          </h2>
          <ul className="space-y-3">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.answer;
              let optionClass =
                "px-4 py-3 border rounded-lg transition-colors duration-200";
              if (isSelected) {
                optionClass += isCorrect
                  ? " bg-green-100 border-green-400 text-green-800"
                  : " bg-red-100 border-red-400 text-red-800";
              } else if (selectedAnswer) {
                optionClass += isCorrectAnswer
                  ? " bg-green-100 border-green-400 text-green-800"
                  : " cursor-not-allowed text-gray-500";
              } else {
                optionClass += " hover:bg-purple-50 cursor-pointer";
              }

              return (
                <li
                  key={i}
                  onClick={() => handleAnswerSelect(option)}
                  className={optionClass}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {isSelected &&
                      (isCorrect ? <Check size={20} /> : <X size={20} />)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {selectedAnswer && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-lg"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Próxima Pergunta"
                : "Ver Resultado"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
