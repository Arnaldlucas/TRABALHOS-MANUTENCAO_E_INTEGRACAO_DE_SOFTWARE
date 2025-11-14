import React from 'react'; // Importe React
import { X } from 'lucide-react';

// 1. Defina a interface para as props
interface TermsModalProps {
  onClose: () => void; // onClose é uma função que não retorna nada
}

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Termos de Uso</h2>
        <div className="prose max-h-[60vh] overflow-y-auto pr-4">
          <p>Bem-vindo ao MindTranslate!</p>
          <p>Ao criar uma conta, você concorda com os seguintes termos:</p>
          {/* ... (conteúdo dos termos) ... */}
          <h4>1. Coleta e Uso de Dados</h4>
          <p>Coletamos seu nome e e-mail com o único propósito de criar e gerenciar sua conta, personalizar sua experiência e registrar seu progresso nos quizzes. Não compartilharemos seus dados com terceiros.</p>
          <h4>2. Conduta do Usuário</h4>
          <p>Você concorda em não usar a plataforma para qualquer atividade ilegal ou que prejudique o serviço ou outros usuários. O respeito mútuo é fundamental.</p>
          <h4>3. Propriedade Intelectual</h4>
          <p>Todo o conteúdo apresentado no MindTranslate, incluindo termos, quizzes e design, é de propriedade do projeto e não pode ser reproduzido sem permissão explícita.</p>
          <h4>4. Limitação de Responsabilidade</h4>
          <p>O MindTranslate é fornecido "como está". Embora nos esforcemos para a precisão do conteúdo, não garantimos que o serviço será ininterrupto ou livre de erros.</p>
          <p>Obrigado por se juntar à nossa comunidade de aprendizado!</p>
        </div>

         <div className="text-right mt-6">
             <button 
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
             >
                Entendi
            </button>
        </div>
      </div>
    </div>
  );
}