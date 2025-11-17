// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDeleteAccount } from './useDeleteAccount';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogout = vi.fn();
const mockCurrentUser = { uid: 'user-123', email: 'teste@email.com' };
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: mockLogout,
    currentUser: mockCurrentUser,
  }),
}));

const mockDeleteDoc = vi.fn();
const mockDeleteUser = vi.fn();
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  deleteDoc: (ref: any) => mockDeleteDoc(ref),
  getFirestore: vi.fn(),
}));
vi.mock('firebase/auth', () => ({
  deleteUser: (user: any) => mockDeleteUser(user),
  getAuth: vi.fn(),
}));

vi.mock('../../pages/firebase-config', () => ({
  db: {},
}));

// ---  A SUÍTE DE TESTES ---

describe('useDeleteAccount Hook', () => {
  
  // Limpa os mocks antes de cada teste para não sobrar "lixo"
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve deletar a conta com sucesso e redirecionar', async () => {
    // 1. Renderiza o Hook
    const { result } = renderHook(() => useDeleteAccount());

    // 2. Executa a função (Ação)
    await act(async () => {
      await result.current.handleDeleteAccount();
    });

    // 3. Verifica os resultados (Expectativas)
    expect(mockDeleteDoc).toHaveBeenCalledTimes(1); // Chamou o firestore?
    expect(mockDeleteUser).toHaveBeenCalledTimes(1); // Chamou o auth?
    expect(mockLogout).toHaveBeenCalledTimes(1); // Fez logout?
    expect(mockNavigate).toHaveBeenCalledWith('/login'); // Redirecionou?
  });

  it('deve lidar com erros durante a exclusão', async () => {
    // Configura o mock para falhar de propósito
    mockDeleteDoc.mockRejectedValueOnce(new Error('Erro de conexão'));

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.handleDeleteAccount();
    });

    // Espera que não tenha redirecionado
    expect(mockNavigate).not.toHaveBeenCalled();
    // Espera que tenha definido a mensagem de erro
    expect(result.current.deleteError).toBe('Erro de conexão');
  });
});