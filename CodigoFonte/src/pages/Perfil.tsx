import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase-config";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { User, Mail, LogOut, Loader, AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
}

// Componente de UI para feedback de carregamento.
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader className="animate-spin text-blue-600" size={40} />
  </div>
);

// Componente de UI para feedback de erro. (Tipado com a interface acima)
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
    <AlertCircle size={40} />
    <p className="mt-4 text-center">{message}</p>
  </div>
);

export const Perfil: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const [userProfile, setUserProfile] = useState<DocumentData | null>(null);
  
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);

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
          console.error(
            "Perfil não encontrado no Firestore para o UID:",
            currentUser.uid
          );
          setError("Não foi possível carregar os detalhes do seu perfil.");
        }
      } catch (err: any) { 
        console.error("Erro ao buscar perfil:", err);
        setError("Ocorreu um erro de rede ao buscar seus dados.");
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User className="text-blue-600" /> Perfil do Usuário
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nome</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{userProfile?.name || "Nome não informado"}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">E-mail</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{currentUser?.email}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 p-2 bg-gray-100 rounded-md">
              Por segurança, sua senha não é exibida. A funcionalidade de
              alteração de senha deve ser um fluxo separado e seguro.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center gap-2 mx-auto"
          >
            <LogOut size={16} />
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}


export default Perfil;