# Planejamento da Manutenção Evolutiva (TP4)

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Visão da Evolução

A manutenção evolutiva deste TP foi planejada não apenas para "adicionar funcionalidades", mas para **amadurecer o produto** em pilares críticos de engenharia: Valor de Produto, Conformidade Legal, Segurança e Manutenibilidade.

Este plano define as **três novas funcionalidades**  e as **duas evoluções arquiteturais** que servem de alicerce para elas.

---

## 2. Funcionalidade 1: "Palavra do Dia" (Evolução de Interface e Engajamento)

### 2.1. Definição da Funcionalidade

Esta funcionalidade consiste em adicionar um novo componente de UI diretamente no `DashBoard.jsx`.

1.  **UI:** Um novo card "Palavra do Dia" será exibido no topo do Dashboard.
2.  **Lógica:** O `dataService.js` terá uma nova função `getWordOfTheDay()`.
3.  **Funcionamento:** A função buscará um termo aleatório da coleção `terms` e o manterá em cache (ex: `localStorage` ou `sessionStorage`) por 24 horas, para que a palavra seja a mesma para o usuário durante todo o dia.

### 2.2. Justificativa (Relevância e Coerência)

* **Melhoria de Experiência (UI):** Esta é uma evolução focada na interface. Ela torna o Dashboard, a página principal, mais dinâmica e menos estática.
* **Coerência:** Reforça o objetivo central do app (aprender termos) de forma passiva e contínua.
* **Engajamento:** É um gancho de retenção clássico, incentivando o usuário a abrir o aplicativo diariamente para "ver a palavra de hoje".

---

## 3. Funcionalidade 2: Algoritmo de Repetição Espaçada (Evolução de Produto)

### 3.1. Definição da Funcionalidade

Esta funcionalidade evolui o `Quiz.jsx` de um teste genérico para um sistema de aprendizado ativo.

1.  **Novos Atributos no Firestore:** Os termos na coleção `quizProgress` (ou uma nova `termsProgress`) ganharão campos: `easeFactor` (facilidade), `interval` (intervalo de dias) e `nextReviewDate` (próxima revisão).
2.  **Lógica de Agendamento:** O `dataService` calculará a `nextReviewDate` de cada termo com base no acerto/erro.
3.  **Novo Modo de "Revisão":** O Dashboard ganhará um botão "Revisar (X) termos" que iniciará um quiz focado *apenas* nos termos prontos para revisão.

### 3.2. Justificativa (Relevância e Coerência)

* **Coerência:** O objetivo do app é "aprender". Um quiz aleatório testa, mas não ensina. A repetição espaçada é o método cientificamente comprovado para retenção de memória, **melhorando significativamente** a eficácia do produto.
* **Ampliação de Escopo:** O sistema deixa de ser um "glossário com quiz" e se torna uma "ferramenta de estudo inteligente".

---

## 4. Funcionalidade 3: Exclusão de Conta (Evolução de Conformidade)

### 4.1. Definição da Funcionalidade

Esta funcionalidade garante a conformidade com o "direito de ser esquecido" da LGPD, uma continuação do trabalho de consentimento do TP anterior.

1.  **UI:** Um botão "Excluir minha conta" será adicionado à página `Perfil.jsx`, protegido por um modal de confirmação.
2.  **Lógica:** O `dataService` orquestrará a exclusão em duas partes: (A) Deletar o registro do usuário no `Firebase Authentication` e (B) Deletar o documento do usuário no `Firestore`.

### 4.2. Justificativa (Relevância e Coerência)

* **Relevância:** É uma evolução de conformidade legal. Coletar dados de usuários sem oferecer um mecanismo de exclusão é uma violação de confiança e da LGPD.
* **Ampliação de Escopo:** Adiciona um ciclo de vida completo ao usuário (Criar, Usar, Excluir), amadurecendo o produto.

---

## 5. Evoluções Arquiteturais de Suporte

Para implementar as funcionalidades acima, as seguintes evoluções de arquitetura são **necessárias**:

### 5.1. Evolução Arquitetural 1: Implementação de Firestore Security Rules

* **Justificativa:** Não podemos, em sã consciência, adicionar lógica de escrita (Repetição Espaçada, Exclusão) sem antes trancar o banco de dados. Um dev sênior *se recusa* a construir em terreno inseguro. Esta evolução garante que um usuário só possa modificar seus *próprios* dados.

### 5.2. Evolução Arquitetural 2: Migração Completa para TypeScript

* **Justificativa:** O projeto é um híbrido instável de JS (`Quiz.jsx`) e TS (`AuthContext.tsx`). Este é o maior débito técnico do projeto. A manutenção evolutiva *exige* pagar essa dívida, garantindo que todo o *codebase* seja tipado, seguro e manutenível.
