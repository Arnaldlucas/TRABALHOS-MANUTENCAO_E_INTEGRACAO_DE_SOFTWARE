# Registro de Implementação da Manutenção Evolutiva (TP4)

Este documento registra o "Antes e Depois" de cada funcionalidade e melhoria implementada, servindo como evidência técnica do trabalho realizado.

---

## 1. Melhoria de Acessibilidade (A11y): Navegação por Teclado no Quiz

* **Responsável:** Nivaldo
* **Justificativa:** Conforme documentado em `melhoria-acessibilidade.md`, a funcionalidade principal do quiz era inacessível para navegação por teclado.
* **Issue Rastreada:** `(link da issue aqui)`

### ANTES (A Opção não era focável)

O código usava um `<li>` com `onClick`, impedindo o foco por `Tab`.

*(Nivaldo: Insira aqui um print do `Quiz.jsx` antigo, destacando a tag `<li>`)*

### DEPOIS (Opção focável e semântica)

O elemento foi refatorado para um `<button>`, que nativamente suporta foco e ativação por teclado, resolvendo a falha de acessibilidade.

*(Nivaldo: Insira aqui o `diff` de código do `Quiz.tsx` mostrando a mudança de `<li>` para `<button>`)*

---

## 2. Funcionalidade 1: "Palavra do Dia" no Dashboard

* **Responsável:** João Victor
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui a UI do `DashBoard.jsx` para ser mais dinâmica e aumentar o engajamento diário.
* **Issue Rastreada:** `(link da issue aqui)`

### ANTES (Dashboard Estático)

O Dashboard era estático e apenas exibia os cards de navegação.

*(João Victor: Insira aqui um print do `DashBoard.jsx` antigo)*

### DEPOIS (Dashboard Dinâmico com "Palavra do Dia")

A lógica foi movida para um *hook* `useWordOfDay.ts` e um novo componente de UI renderiza a palavra do dia, melhorando a interface.

*(João Victor: Insira aqui um print do `DashBoard.tsx` novo, com o card "Palavra do Dia" visível, e um `diff` de código do `useWordOfDay.ts`)*

---

## 3. Funcionalidade 2: Exclusão de Conta de Usuário (LGPD)

* **Responsável:** Victor Gabriel
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui a conformidade com a LGPD, adicionando o "direito de ser esquecido" ao perfil.
* **Pull Request:** [#32](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/32)

### ANTES (Perfil sem Exclusão)

A página `Perfil.jsx` não oferecia ao usuário a opção de remover sua própria conta.

<img width="1591" height="957" alt="Perfil-antes" src="https://github.com/user-attachments/assets/5242a8c5-3ecb-4fcc-b501-bc0abdedf30f" />

### DEPOIS (Perfil com Opção de Exclusão)

Migrei a página de Perfil para TypeScript (.tsx) e implementei a funcionalidade de exclusão de conta através de um novo hook isolado, o useDeleteAccount.ts. A interface recebeu um botão de exclusão com modal de confirmação e feedback visual, enquanto a lógica gerencia a remoção segura dos dados no Firebase (Auth e Firestore) de forma independente do serviço principal, evitando conflitos de código.

<img width="1591" height="957" alt="Perfil-depois" src="https://github.com/user-attachments/assets/e3baf767-c27b-4932-beda-6d0177dc371f" />

<img width="1591" height="957" alt="Perfil-depois-2" src="https://github.com/user-attachments/assets/699841d4-9bdd-44fe-a9eb-1554702a3ead" />

---

## 4. Funcionalidade 3: Repetição Espaçada (Lógica Base)

* **Responsável:** Illgner
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui o sistema de um simples quiz para uma ferramenta de estudo inteligente.
* **Issue Rastreada:** `(link da issue aqui)`

### ANTES (Progresso Simples)

A página `Progresso.jsx` apenas listava resultados passados.

*(Illgner: Insira aqui um print do `Progresso.jsx` antigo)*

### DEPOIS (Lógica de Revisão Ativa)

Foi criado um *hook* `useSpacedRepetition.ts` que analisa o histórico e calcula os termos que precisam de revisão. A UI da página `Progresso.tsx` agora exibe essa informação ativamente.

*(Illgner: Insira aqui um print do `Progresso.tsx` novo, mostrando a UI de "Termos a Revisar", e um `diff` de código do `useSpacedRepetition.ts`)*
