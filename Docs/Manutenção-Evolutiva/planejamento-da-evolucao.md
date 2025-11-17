# Planejamento da Manutenção Evolutiva (TP4)

**Projeto:** MindTranslate  
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner  

---

## 1. Nossa Visão para esta Evolução

Para este trabalho, nossa meta vai além de apenas adicionar novas _features_. Estamos focados em amadurecer o **MindTranslate** como um produto real.

Cada mudança foi planejada para fortalecer o projeto nos seguintes pilares:

- **Valor ao Usuário:** Tornar o app mais útil e engajante.  
- **Segurança:** Proteger os dados dos nossos usuários.  
- **Conformidade:** Respeitar boas práticas e leis como a LGPD.  
- **Manutenibilidade:** Garantir que o projeto seja estável e fácil de melhorar no futuro.  

---

## 2. Nosso Plano de Ação em Fases

Dividimos o trabalho em duas fases estratégicas: **Alicerce** e **Evolução**.

---

### 🧱 Fase 1: O Alicerce

**Objetivo:** Fortalecer a base do projeto, eliminando débitos técnicos críticos.

**Status:** ⛔ Concluído

**Tarefas (Arnald):**

- **Migração para TypeScript (Core):**  
  Migrar serviços centrais e infraestrutura da aplicação — `dataService`, `AuthContext`, `Layout`, `App.tsx`, `main.tsx`, etc.

- **Regras de Segurança (Security Rules):**  
  “Trancar” o banco de dados para que cada usuário só edite seus próprios dados.

---

### 🚀 Fase 2: Evolução Paralela

A partir da base sólida, a equipe avança em paralelo para implementar novas funcionalidades e melhorias.

---

#### 1. Funcionalidade: “Palavra do Dia”

- **O que é:**  
  Um card no Dashboard exibindo uma palavra aleatória do glossário a cada dia.

- **Por que:**  
  Aumenta o engajamento diário.

- **Critérios de Aceite (MVP):**
  - Criar um hook `useWordOfDay.ts`
  - Buscar um termo aleatório da coleção `terms`
  - Cachear no `sessionStorage` (cache simples) para manter por sessão
  - Renderizar no `DashBoard.tsx`

- **Responsável:** João Victor  

---

#### 2. Funcionalidade: Exclusão de Conta (LGPD)

- **O que é:**  
  Um botão no perfil que permite ao usuário deletar permanentemente sua conta e dados.

- **Por que:**  
  Conformidade com a LGPD ("direito de ser esquecido").

- **Critérios de Aceite (MVP):**
  - Criar o hook `useDeleteAccount.ts`
  - Página `Perfil.tsx` contém botão vermelho de exclusão
  - Confirmar ação com `window.confirm()`
  - Hook remove dados do Auth e Firestore via `dataService`

- **Responsável:** Victor Gabriel  

---

#### 3. Melhoria: Acessibilidade (A11y) – Contraste e Rótulos (WCAG)

- **O que é:**  
  Auditoria com Axe DevTools para resolver falhas críticas de acessibilidade.

- **Por que:**  
  Garante que o app seja inclusivo, especialmente para usuários com baixa visão ou que dependem de leitores de tela.

- **Critérios de Aceite (MVP):**
  - Corrigir contraste de botões (`Progresso.tsx` — de `bg-green-600` para `bg-green-800`)
  - Adicionar `aria-label` em botões de ícone (`Perfil`, `Menu` em `Layout.tsx`)
  - Auditoria Axe DevTools deve reportar **0 issues críticas**

- **Responsável:** Arnald  

---

## 3. Nosso Processo de Trabalho

- 🧩 **Trabalho Isolado** (Branches individuais)  
- 🔄 **Revisão por Pares** (Pull Requests)  
- 🚫 **Prevenção de Conflitos** (estratégia de hooks isolados)

---

## 4. Papéis da Equipe (Reforço)

### 👨‍💻 Tech Lead (Arnald)

- Executa a **Fase 1** (Alicerce)  
- Executa a **melhoria de acessibilidade** (contraste/rótulos)  
- Integra todo o trabalho e documenta no `registro-das-implementação.md`  

### 🧑‍💻 Desenvolvedores (João Victor, Victor Gabriel)

- Migrar a página da funcionalidade para `.tsx` como 1º commit  
- Desenvolver suas features conforme o MVP  
- Criar teste unitário para seu hook (ex: `useDeleteAccount.test.ts`)  
- Participar ativamente das revisões (PRs)

---
