import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react"; // Importe React para tipar 'children'

// 1. Defina o tipo das props
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();

  // O console.log que existia foi removido (era para debug)

  if (loading) {
    // Idealmente, isso deveria ser um spinner de página inteira
    return <div>Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}