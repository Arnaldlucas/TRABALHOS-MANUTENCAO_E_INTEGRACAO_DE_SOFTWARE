# Registro de Implementação da Manutenção Evolutiva (TP4)

Este documento registra o "Antes e Depois" de cada funcionalidade, melhoria de acessibilidade e evolução arquitetural implementada, servindo como evidência técnica do trabalho realizado.

---

## 0. Evoluções de Alicerce (Tech Lead)

Estas foram as evoluções de arquitetura e segurança, executadas pelo Tech Lead (Arnald) para criar uma fundação estável para as *features* da Fase 2.

### 0.1. Evolução Arquitetural 1: Migração Completa para TypeScript

* **Responsável:** Arnald
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, o *codebase* era um híbrido instável de `.js` e `.tsx`. A migração 100% para TS era necessária para garantir a manutenibilidade e a segurança de tipos.

* **Evidência (Pull Request):** [#30](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/30)
* **Evidência (Snippet de Código):** O `dataService.js` foi migrado para `dataService.ts`, com interfaces claras para nossos modelos de dados:

```typescript
// CodigoFonte/src/services/dataService.ts

// Perfil do usuário no Firestore
export interface UserProfile {
  name: string;
  email: string;
  createdAt: Timestamp;
}

// Um termo do glossário
export interface Term {
  id: string;
  term: string;
  translation: string;
  description: string;
}

// ... (etc.)
```
### 0.2. Evolução Arquitetural 2: Implementação de Firestore Security Rules

**Responsável:** Arnald

**Justificativa:** Conforme `planejamento-da-evolucao.md`, o banco de dados estava inseguro. As regras de segurança foram implementadas para garantir que usuários só possam ler e escrever seus próprios dados.

**Evidência (Pull Request):** [#27](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/27/commits/fedaf764740729628357f73e8ed2f971a2658c54#diff-05ab5442917a0ee032e55f5eecca96ffc597d9a696a1455797b2778adb9bb00c)

**Evidência (Snippet de Código):** O novo arquivo `firestore.rules` tranca a coleção `users`:

```plaintext
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Regra 2: Perfis de Usuário
    match /users/{userId} {
      
      // O usuário só pode ler, criar ou atualizar SEU PRÓPRIO documento.
      allow read, create, update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false; // Ninguém pode deletar por enquanto

      // Regra 3: Subcoleção de Progresso
      match /quizProgress/{progressId} {
        // O usuário só pode ler e criar progresso para si mesmo.
        allow read, create: if request.auth != null && request.auth.uid == userId;
        allow update, delete: if false; // Impede adulteração de histórico
      }
    }
    
    // (outras regras como /terms e /quizzes) ...
  }
}
```
## 1. Melhoria de Acessibilidade (A11y): Navegação por Teclado no Quiz

**Responsável:** Nivaldo

**Justificativa:** Conforme documentado em `melhoria-acessibilidade.md`, a funcionalidade principal do quiz era inacessível para navegação por teclado.

**Pull Request (Evidência):** (Nivaldo: Insira o link para o seu PR 'fix/quiz-teclado' aqui)

---

### ANTES (A Opção não era focável)

O código usava um `<li>` com `onClick`, impedindo o foco por Tab.

*(Nivaldo: Insira aqui um print do Quiz.jsx antigo, destacando a tag `<li>`)*

### DEPOIS (Opção focável e semântica)

O elemento foi refatorado para um `<button>`, que nativamente suporta foco (Tab) e ativação (Enter/Space), resolvendo a falha de acessibilidade.

*(Nivaldo: Insira aqui o snippet de código do Quiz.tsx mostrando a mudança de `<li>` para `<button`>)*

```typescript
// Nivaldo: Cole seu snippet de código aqui
<ul className="space-y-3">
  {currentQuestion.options.map((option, i) => {
    // ...
    return (
      <button // <-- MUDANÇA PRINCIPAL
        key={i}
        onClick={() => handleAnswerSelect(option)}
        className={optionClass}
        // ... (outros atributos)
      >
        {/* ... */}
      </button>
    );
  })}
</ul>
```
## 2. Funcionalidade 1: "Palavra do Dia" no Dashboard

**Responsável:** João Victor

**Justificativa:** Conforme `planejamento-da-evolucao.md`, esta feature evolui a UI do `DashBoard.jsx` para ser mais dinâmica e aumentar o engajamento diário.

**Pull Request (Evidência):** (João Victor: Insira o link para o seu PR 'feat/palavra-do-dia' aqui)

---

### ANTES (Dashboard Estático)

O Dashboard era estático e apenas exibia os cards de navegação.

*(João Victor: Insira aqui um print do DashBoard.jsx antigo)*

### DEPOIS (Dashboard Dinâmico com "Palavra do Dia")

A lógica foi movida para um hook `useWordOfDay.ts` e um novo componente de UI renderiza a palavra do dia, melhorando a interface.

*(João Victor: Insira aqui um print do DashBoard.tsx novo, com o card "Palavra do Dia" visível)*

### Evidência de Qualidade (Teste Unitário)

*(João Victor: Insira aqui um snippet do seu teste para o useWordOfDay.ts)*

```typescript
// Exemplo: CodigoFonte/src/features/dashboard/useWordOfDay.test.ts
describe('useWordOfDay', () => {
  it('deve buscar um termo e cacheá-lo', async () => {
    // ... (Mock do dataService)
    // ... (Renderização do hook)
    // ... (Assertivas de que o termo foi retornado)
  });
});
```
## 3. Funcionalidade 2: Exclusão de Conta de Usuário (LGPD)

**Responsável:** Victor Gabriel

**Justificativa:** Conforme `planejamento-da-evolucao.md`, esta feature evolui a conformidade com a LGPD, adicionando o "direito de ser esquecido" ao perfil.

**Pull Request (Evidência):** (Victor Gabriel: Insira o link para o seu PR 'feat/excluir-conta' aqui)

---

### ANTES (Perfil sem Exclusão)

A página `Perfil.jsx` não oferecia ao usuário a opção de remover sua própria conta.

*(Victor Gabriel: Insira aqui um print do Perfil.jsx antigo)*

### DEPOIS (Perfil com Opção de Exclusão)

Foi adicionado um "Botão de Perigo" que, através de um hook `useDeleteAccount.ts`, orquestra a remoção do usuário no Auth e no Firestore.

*(Victor Gabriel: Insira aqui um print do Perfil.tsx novo com o botão/modal)*

### Evidência de Qualidade (Teste Unitário)

*(Victor Gabriel: Insira aqui um snippet do seu teste para o useDeleteAccount.ts)*

```typescript
// Exemplo: CodigoFonte/src/features/profile/useDeleteAccount.test.ts
describe('useDeleteAccount', () => {
  it('deve chamar o dataService e o auth para deletar o usuário', async () => {
    // ... (Mocks)
    // ... (Execução da função do hook)
    // ... (Assertivas de que os mocks foram chamados)
  });
});

```

## 4. Funcionalidade 3: Repetição Espaçada (Lógica Base)

**Responsável:** Illgner

**Justificativa:** Conforme `planejamento-da-evolucao.md`, esta feature evolui o sistema de um simples quiz para uma ferramenta de estudo inteligente.

**Pull Request (Evidência):** (Illgner: Insira o link para o seu PR 'feat/repeticao-espacada' aqui)

---

### ANTES (Progresso Simples)

A página `Progresso.jsx` apenas listava resultados passados.

*(Illgner: Insira aqui um print do Progresso.jsx antigo)*

### DEPOIS (Lógica de Revisão Ativa)

Foi criado um hook `useSpacedRepetition.ts` que analisa o histórico e calcula os termos que precisam de revisão. A UI da página `Progresso.tsx` agora exibe essa informação ativamente.

*(Illgner: Insira aqui um print do Progresso.tsx novo, mostrando a UI de "Termos a Revisar")*

### Evidência de Qualidade (Teste Unitário)

*(Illgner: Insira aqui um snippet do seu teste para o useSpacedRepetition.ts)*

```typescript
// Exemplo: CodigoFonte/src/features/quiz/useSpacedRepetition.test.ts
describe('useSpacedRepetition', () => {
  it('deve retornar X termos para revisar baseado no histórico', async () => {
    // ... (Mock do histórico de quizzes)
    // ... (Renderização do hook)
    // ... (Assertiva de que o número de termos a revisar está correto)
  });
});
