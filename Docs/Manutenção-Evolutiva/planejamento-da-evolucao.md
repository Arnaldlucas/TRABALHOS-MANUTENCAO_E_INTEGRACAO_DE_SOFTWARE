# Planejamento da Manutenção Evolutiva (TP4)

**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Nossa Visão para esta Evolução

Para este trabalho, nossa meta vai além de apenas adicionar novas "features". Estamos focados em **amadurecer o MindTranslate como um produto real**.

Isso significa que cada mudança foi pensada para fortalecer o projeto em quatro pilares essenciais:
1.  **Valor ao Usuário:** Tornar o app mais útil e engajante.
2.  **Segurança:** Proteger os dados dos nossos usuários.
3.  **Conformidade:** Respeitar as boas práticas e a lei (LGPD).
4.  **Manutenibilidade:** Garantir que o projeto seja estável e fácil de melhorar no futuro.

---

## 2. Nosso Plano de Ação em Fases

Para organizar a equipe e garantir uma entrega de qualidade, dividimos o trabalho em duas fases claras: uma de **alicerce** e outra de **construção**.

### Fase 1: O Alicerce 

O objetivo é fortalecer a fundação do projeto, pagando os débitos técnicos **críticos** e **bloqueadores**.

* **Status:** ⛔ **Ninguém começa a Fase 2 até que esta etapa esteja concluída.**
* **O que será feito (Arnald):**
    1.  **Migração para TypeScript (Core):** Migrar os serviços centrais e a "casca" da aplicação (`dataService`, `AuthContext`, `Layout`, `App.tsx`, `main.tsx`, etc.).
    2.  **Implementar Regras de Segurança (Security Rules):** "Trancar" o banco de dados, garantindo que um usuário só possa editar seus próprios dados.

### Fase 2: Evolução Paralela (Toda a Equipe)

Com a base fortalecida, a equipe começa a trabalhar em paralelo.

#### 1. Funcionalidade: "Palavra do Dia"
* **O que é?** Um novo card no painel principal que mostra uma palavra aleatória do glossário por dia.
* **Por que?** É um gancho de **engajamento** que incentiva o uso diário.
* **Critérios de Aceite (MVP):**
    1.  Um novo *hook* `useWordOfDay.ts` é criado (para evitar conflitos no `dataService`).
    2.  O *hook* busca **um** termo aleatório da coleção `terms`.
    3.  A palavra é cacheada no `sessionStorage` (cache simples) para não mudar a cada *refresh*.
    4.  Um novo card exibe a palavra no `DashBoard.tsx`.
* **Responsável:** João Victor

#### 2. Funcionalidade: Repetição Espaçada (Lógica Base)
* **O que é?** Uma lógica que identifica quais termos o usuário precisa revisar.
* **Por que?** É a evolução **mais importante** do produto, tornando-o uma ferramenta de estudo inteligente.
* **Critérios de Aceite (MVP):**
    1.  Um novo *hook* `useSpacedRepetition.ts` é criado.
    2.  O *hook* **lê** o histórico do `dataService.fetchProgressSummary()`.
    3.  A lógica de revisão será **simples (MVP)**: "Termos com % de acerto < 50% nos últimos 3 quizzes". **Não** implementar algoritmos complexos (ex: SM-2).
    4.  A UI na página `Progresso.tsx` é atualizada para mostrar "Você tem **X** termos para revisar."
* **Responsável:** Illgner

#### 3. Funcionalidade: Exclusão de Conta (LGPD)
* **O que é?** Um botão no perfil que permite ao usuário deletar permanentemente sua conta e dados.
* **Por que?** Garante nossa **conformidade com a LGPD** e respeita o "direito de ser esquecido" do usuário.
* **Critérios de Aceite (MVP):**
    1.  Um novo *hook* `useDeleteAccount.ts` é criado.
    2.  A página `Perfil.tsx` tem um "botão de perigo" (vermelho).
    3.  Ao clicar, um `window.confirm()` (simples) é usado para confirmar a ação.
    4.  O *hook* chama as funções necessárias do `dataService` para deletar o usuário do Auth e do Firestore.
* **Responsável:** Victor Gabriel

#### 4. Melhoria: Acessibilidade (A11y) no Quiz
* **O que é?** Refatorar o Quiz para ser 100% usável via teclado.
* **Por que?** Garante que o app seja **inclusivo**, corrigindo um *bug* crítico que exclui usuários.
* **Critérios de Aceite (MVP):**
    1.  O componente `Quiz.tsx` é refatorado: os `<li>` de resposta viram elementos `<button>`.
    2.  A navegação com a tecla `Tab` entre as opções deve funcionar.
    3.  A seleção com as teclas `Enter` ou `Espaço` deve funcionar.
    4.  Deve haver um indicador de foco visível (ex: `focus:ring`) ao navegar com `Tab`.
* **Responsável:** Nivaldo

---

## 3. Nosso Processo de Trabalho

1.  **Trabalho Isolado (Branches)**
2.  **Revisão por Pares (Pull Requests)**
3.  **Prevenção de Conflitos (Estratégia de Hooks)**

---

## 4. Papéis da Equipe (Reforçado)

* **Tech Lead (Arnald):**
    * Responsável por executar a **Fase 1 (Alicerce)**.
    * Garantir a integração final de todo o trabalho (resolver merges se necessário).
    * Consolidar a documentação final do `registro-das-implementação.md` e `CHANGELOG.md`.

* **Desenvolvedores (Nivaldo, João Victor, Victor Gabriel, Illgner):**
    * **Tarefa 0:** Migrar a página principal da sua *feature* para `.tsx` (ex: `Quiz.jsx` -> `Quiz.tsx`) como seu primeiro *commit*.
    * Responsáveis por executar suas funcionalidades (Fase 2) de acordo com os **Critérios de Aceite (MVP)**.
    * **(Novo)** Escrever um teste unitário básico para a lógica de *hook* criada (ex: `useWordOfDay.test.ts`).
    * Participar ativamente da revisão de código (Pull Requests) dos colegas.
