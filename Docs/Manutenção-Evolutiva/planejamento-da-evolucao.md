# Planejamento da Manutenção Evolutiva (TP4)

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Visão Evolução

A manutenção evolutiva deste TP foi planejada não apenas para "adicionar funcionalidades", mas para **amadurecer o produto** em pilares críticos de engenharia: Valor de Produto, Conformidade Legal, Segurança e Manutenibilidade.

Este plano define as **duas novas funcionalidades** exigidas pelo TP4 e as **duas evoluções arquiteturais** que servem de alicerce para elas.

---

## 2. Funcionalidade 1: Algoritmo de Repetição Espaçada (Spaced Repetition)

### 2.1. Definição da Funcionalidade

Esta funcionalidade evolui o `Quiz.jsx` de um teste genérico para um sistema de aprendizado ativo.

1.  **Novos Atributos no Firestore:** Os termos na coleção `users/{uid}/termsProgress` (nova) ou `quizProgress` ganharão campos: `easeFactor` (facilidade), `interval` (intervalo de dias) e `nextReviewDate` (próxima revisão).
2.  **Lógica de Agendamento:** Após um quiz, o `dataService` calculará a `nextReviewDate` de cada termo com base no acerto/erro (ex: algoritmo SM-2).
3.  **Novo Modo de "Revisão":** O Dashboard ganhará um botão "Revisar (X) termos" que iniciará um quiz focado *apenas* nos termos cuja `nextReviewDate` é hoje.

### 2.2. Justificativa (Relevância e Coerência)

* **Coerência:** O objetivo do app é "aprender". Um quiz aleatório testa, mas não ensina. A repetição espaçada é o método cientificamente comprovado para retenção de memória, **melhorando significativamente** a eficácia do produto.
* **Ampliação de Escopo:** O sistema deixa de ser um "glossário com quiz" e se torna uma "ferramenta de estudo inteligente".

---

## 3. Funcionalidade 2: Exclusão de Conta de Usuário (Conformidade LGPD)

### 3.1. Definição da Funcionalidade

Esta funcionalidade garante a conformidade com o "direito de ser esquecido" da LGPD, uma continuação do trabalho de consentimento do TP anterior.

1.  **UI:** Um botão "Excluir minha conta" será adicionado à página `Perfil.jsx`, protegido por um modal de confirmação.
2.  **Backend (Firebase Function):** A exclusão será gerenciada por uma Firebase Function (ver Evolução 4) para garantir a execução atômica.
3.  **Ação:** A função irá: (A) Deletar o registro do usuário no `Firebase Authentication` e (B) Deletar o documento do usuário e todas as subcoleções (`quizProgress`) no `Firestore`.

### 3.2. Justificativa (Relevância e Coerência)

* **Relevância:** É uma evolução de conformidade legal. Coletar dados de usuários sem oferecer um mecanismo de exclusão é uma violação de confiança e da LGPD.
* **Ampliação de Escopo:** Adiciona um ciclo de vida completo ao usuário (Criar, Usar, Excluir), amadurecendo o produto.

---

## 4. Evolução Arquitetural 1: Implementação de Firestore Security Rules

### 4.1. Definição da Evolução

O acesso ao Firestore será protegido por regras de segurança no `firestore.rules`. O acesso anônimo será bloqueado e regras de escrita/leitura granulares serão criadas.

* **Exemplo de Regra:**
    ```
    match /users/{userId} {
      // Usuário só pode ler e escrever seu próprio documento
      allow read, write: if request.auth.uid == userId;
    }
    match /users/{userId}/quizProgress/{docId} {
      // Usuário só pode ler e criar progresso para si mesmo
      allow read, create: if request.auth.uid == userId;
      // Ninguém (nem o usuário) pode atualizar um progresso salvo
      allow update, delete: if false;
    }
    ```

### 4.2. Justificativa

* **Segurança:** Esta é a fundação. Sem ela, qualquer usuário pode ler os dados de `quizProgress` de outro usuário ou sobrescrever o seu próprio. A manutenção evolutiva *exige* um ambiente seguro.

---

## 5. Evolução Arquitetural 2: Migração Completa para TypeScript

### 5.1. Definição da Evolução

Todos os arquivos `.js` e `.jsx` serão convertidos para `.ts` e `.tsx`, aproveitando o fato de que o projeto já está parcialmente configurado.

1.  **Renomeação:** `Quiz.jsx` → `Quiz.tsx`, `DashBoard.jsx` → `DashBoard.tsx`, etc.
2.  **Tipagem:** Todos os *props*, *hooks* e estados locais (`useState`) serão explicitamente tipados.
3.  **Refatoração:** Tipos serão criados para os dados do Firestore (ex: `interface QuizQuestion`, `interface UserProfile`).

### 5.2. Justificativa

* **Manutenibilidade:** Este é o maior débito técnico do projeto. Um código-fonte híbrido é confuso e anula os benefícios do TS. A evolução para um *codebase* 100% tipado é a melhoria de qualidade interna mais impactante, prevenindo bugs futuros e facilitando a manutenção.
