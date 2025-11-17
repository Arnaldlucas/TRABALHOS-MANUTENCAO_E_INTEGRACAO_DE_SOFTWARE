// Este é um hook falso (placeholder) para destravar o DashBoard

// Importe o tipo 'Term' que você já deve ter no dataService
import type { Term } from '../../services/dataService';

// Um objeto de Termo falso para teste
const mockTermo: Term = {
  id: 'mock-1',
  term: 'Mock Term',
  translation: 'Termo de Teste',
  description: 'Este é um termo de teste para o dashboard.'
};

export const useWordOfDay = () => {
  // Retorna os dados que o DashBoard.tsx espera
  return {
    palavra: mockTermo, // Retorna o termo falso
    loading: false,
    error: null,
  };
};