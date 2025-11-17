// CodigoFonte/src/pages/Perfil.tsx

import React, { useState, useEffect } from "react";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { User, LogOut, Loader, AlertCircle, Trash2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase-config";
import { useDeleteAccount } from "../features/profile/useDeleteAccount";

interface ErrorDisplayProps {
  message: string;
  onLogout: () => void; // Adicionei opção de logout no erro
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader className="animate-spin text-blue-600" size={40} />
  </div>
);

// Componente de Erro agora tem botão de Sair para não travar o usuário
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onLogout }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-red-600 px-4">
    <AlertCircle size={40} />
    <p className="mt-4 text-center mb-6">{message}</p>
    <button 
      onClick={onLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Forçar Logout
    </button>
  </div>
);

export const Perfil: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const [userProfile, setUserProfile] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  // Removi o estado de erro bloqueante para casos de perfil inexistente
  const [fatalError, setFatalError] = useState<string | null>(null);

  const { handleDeleteAccount, isLoading: isDeleting, deleteError } = useDeleteAccount();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          // === MUDANÇA === 
          // Não geramos erro fatal se o perfil sumiu. 
          // Apenas logamos e deixamos a UI carregar vazia.
          console.warn("Perfil não encontrado (pode ter sido deletado parcialmente).");
        }
      } catch (err: any) {
        console.error("Erro ao buscar perfil:", err);
        setFatalError("Erro de conexão. Verifique sua internet.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Falha no logout:", err);
    }
  };

  const handleDangerClick = () => {
    const confirmed = window.confirm(
      "⚠️ EXCLUIR CONTA ⚠️\n\n" +
      "Deseja remover seu acesso de login permanentemente?"
    );

    if (confirmed) {
      handleDeleteAccount();
    }
  };

  if (loading) return <LoadingSpinner />;
  
  // Se der erro FATAL (sem internet), mostramos a tela de erro com opção de sair
  if (fatalError) return <ErrorDisplay message={fatalError} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User className="text-blue-600" /> Perfil do Usuário
        </h1>

        {/* Aviso se o perfil estiver vazio (Limbo) */}
        {!userProfile && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6 text-yellow-800 text-sm">
            ⚠️ <strong>Atenção:</strong> Seus dados de perfil não foram encontrados. 
            Isso pode acontecer se você tentou excluir a conta mas o processo falhou na metade.
            Use o botão vermelho abaixo para terminar de excluir seu login.
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nome</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{userProfile?.name || "--- (Dados apagados) ---"}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">E-mail</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{currentUser?.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition flex items-center gap-2 mx-auto"
          >
            <LogOut size={16} />
            Sair da Sessão
          </button>
        </div>

        <hr className="my-10 border-gray-300" />

        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600 text-sm mb-4">
            Excluir conta e remover acesso de login permanentemente.
          </p>
          
          <button
            onClick={handleDangerClick}
            disabled={isDeleting}
            className={`
              w-full sm:w-auto px-6 py-2 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition
              ${isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}
            `}
          >
            {isDeleting ? "Excluindo Login..." : (
              <>
                <Trash2 size={18} />
                Excluir Minha Conta
              </>
            )}
          </button>

          {deleteError && (
            <p className="mt-3 text-sm text-red-800 font-bold bg-red-100 p-2 rounded">
              {deleteError}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Perfil;