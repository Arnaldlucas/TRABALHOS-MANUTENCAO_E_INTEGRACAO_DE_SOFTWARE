// ARQUIVO: CodigoFonte/src/pages/Register.jsx (Refatorado)

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from 'lucide-react';
import TermsModal from '../components/TermsModal'; // Importa o componente do Modal

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  const [error, setError] = useState(null); // Para erros GERAIS (do Firebase)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========================================================================
  // MUDANÇA (Heurística 5): Adição de estado para validação inline
  // ========================================================================
  const [passwordError, setPasswordError] = useState(''); // Erro específico de senha
  // ========================================================================

  // Função para validar senhas em tempo real (inline)
  const validatePasswords = (passToConfirm) => {
    if (password && passToConfirm && password !== passToConfirm) {
      setPasswordError('As senhas não coincidem.');
    } else {
      setPasswordError(''); // Limpa o erro se elas coincidirem
    }
  };


  const handleRegister = async (event) => {
    event.preventDefault();

    // Validação final antes de enviar
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    // Se a validação inline já mostrou um erro, não continue.
    if (passwordError) {
      return; 
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await register(name, email, password);
      alert("Registro realizado com sucesso! Agora você pode fazer o login.");
      navigate('/login');
    } catch (err) {
      console.error("Erro no registro:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este endereço de e-mail já está em uso.");
      } else if (err.code === 'auth/weak-password') {
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Criar Conta
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Input de Nome */}
            <div> <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome completo</label> <input id="name" type="text" placeholder="João da Silva" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" /> </div> 
            
            {/* Input de E-mail */}
            <div> <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label> <input id="email" type="email" placeholder="voce@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" /> </div> 
            
            {/* Input de Senha */}
            <div> <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label> <input id="password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" /> </div> 
            
            {/* ========================================================================
                MUDANÇA (Heurística 5): Adição de onBlur e feedback de erro inline
                ======================================================================== */}
            <div> 
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirme a senha</label> 
              <input 
                id="confirmPassword" 
                type="password" 
                placeholder="Repita sua senha" 
                value={confirmPassword} 
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswords(e.target.value); // Valida enquanto digita
                }} 
                onBlur={() => validatePasswords(confirmPassword)} // Valida ao sair do campo
                required 
                className={`mt-1 w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              /> 
              {/* Feedback de erro inline (imediato) */}
              {passwordError && <p className="text-sm text-red-600 pt-1">{passwordError}</p>}
            </div>
            {/* ======================================================================== */}

            {/* Checkbox de Termos */}
            <div className="flex items-center space-x-2 pt-2">
              <input 
                id="terms" 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Eu li e concordo com os{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Termos de Uso
                </button>
                .
              </label>
            </div>
            
            {/* Erro Geral (do Firebase) */}
            {error && <p className="text-sm text-red-600 text-center pt-2">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting || !termsAccepted || !!passwordError} // Botão fica desabilitado se houver erro inline
              className="w-full flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader className="animate-spin" /> : 'Cadastrar'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </main>

      {isTermsModalOpen && <TermsModal onClose={() => setIsTermsModalOpen(false)} />}
    </>
  );
}