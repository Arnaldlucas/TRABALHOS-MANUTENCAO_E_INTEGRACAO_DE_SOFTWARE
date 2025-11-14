// ARQUIVO: CodigoFonte/src/hooks/useAuth.ts (Migrado)

import { useContext } from 'react';
// Importe o TIPO do contexto, além do contexto em si
import { AuthContext, AuthContextType } from '../context/AuthContext'; 

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // Uma boa prática é garantir que o hook está sendo usado dentro do Provider
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};