// ARQUIVO: CodigoFonte/src/features/profile/useDeleteAccount.ts

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// --- MUDANÇA CRUCIAL: Importamos o Firebase diretamente ---
// Ignoramos o dataService para não violar a regra de edição de arquivo compartilhado.
import { db } from '../../pages/firebase-config'; 
import { doc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth'; 

export const useDeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  const { logout, currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    // Se não tem usuário logado, não faz nada
    if (!currentUser) return;

    setIsLoading(true);
    setDeleteError(null);

    try {
      console.log("Iniciando exclusão para UID:", currentUser.uid);

      // 1. Apagar o documento do usuário no Firestore ("banco de dados")
      const userDocRef = doc(db, "users", currentUser.uid);
      await deleteDoc(userDocRef);

      // 2. Apagar o usuário da Autenticação (Login/Senha)
      // Isso é o que realmente "mata" a conta no Firebase Auth
      await deleteUser(currentUser);

      // 3. Tentar deslogar (limpeza local)
      try {
        await logout();
      } catch (e) {
        // Ignoramos erro de logout pois o usuário já foi deletado
      }

      // 4. Redirecionar para login
      navigate('/login'); 
      
    } catch (err: any) {
      console.error("Erro ao excluir conta:", err);
      
      // Tratamento específico para erro de segurança do Firebase
      if (err.code === 'auth/requires-recent-login') {
        setDeleteError("Por segurança, faça logout e login novamente antes de excluir sua conta.");
      } else {
        const msg = err.message || "Não foi possível excluir a conta. Tente novamente.";
        setDeleteError(msg);
      }
      
      setIsLoading(false);
    }
  };

  return {
    handleDeleteAccount,
    isLoading,
    deleteError,
  };
};