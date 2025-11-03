# Justificativa da Refatoração de Design: Padrão Facade (Fachada)

Este documento justifica a escolha e a aplicação de um padrão de projeto para resolver um problema de design fundamental identificado no projeto MindTranslate.

## 1. Problema de Design Identificado (O "Antes")

A análise da arquitetura original do projeto, documentada em `diagramas_de_classe.md` (Diagrama Original), revelou um problema de design crítico: **Alto Acoplamento** e **Violação do Princípio da Responsabilidade Única (SRP)**.

**Code Smells Identificados:**
* **Alto Acoplamento (High Coupling):** Os componentes da camada de visualização (React Pages, como `Termos.jsx`, `Quiz.jsx`, `Perfil.jsx`) estavam diretamente acoplados à implementação da camada de dados. Eles importavam `db` (a instância do Firestore) diretamente do `firebase-config.js` e executavam consultas específicas do Firebase (`getDocs`, `collection`, `query`, `doc`, `setDoc`).
* **Inveja de Funcionalidade (Feature Envy):** Nossos componentes de UI "invejavam" as funções do Firestore. Eles continham lógica complexa de acesso a dados que claramente pertencia a outra camada da aplicação.

### Por que isso é um problema?

Esta arquitetura é inadequada e viola as boas práticas de engenharia de software pelos seguintes motivos:

1.  **Baixa Manutenibilidade:** Se a estrutura da coleção "users" no Firestore fosse renomeada (ex: para "perfis"), ou se um campo mudasse, seríamos forçados a "caçar" e modificar múltiplos componentes de UI, tornando a manutenção cara e suscetível a erros.
2.  **Complexidade para o Cliente:** O componente de UI (o "cliente") era forçado a conhecer e orquestrar múltiplas chamadas complexas do subsistema do Firestore (ex: `query`, `limit`, `startAfter`, `getDocs`) apenas para realizar uma ação simples, como "carregar mais termos".
3.  **Dificuldade de Teste:** É complexo realizar testes unitários em componentes de UI que fazem chamadas reais a um banco de dados externo.

## 2. Padrão de Projeto Aplicado: Facade (Fachada)

Para resolver esse problema, aplicamos o padrão de projeto **Facade (Fachada)**, um Padrão Estrutural.

### 2.1. Alinhamento com o Material de Apoio (EngSoftModerna Cap. 6)

A escolha deste padrão foi diretamente inspirada no material de apoio da disciplina (Engenharia de Software Moderna, Cap. 6, Seção 6.6).

O material apresenta um problema análogo: um cliente que precisa conhecer múltiplas classes internas (`Scanner`, `Parser`, `AST`, `CodeGenerator`) apenas para executar um `InterpretadorX`. A solução "Facade" é uma classe `InterpretadorX` que encapsula essa complexidade em um único método `eval()`.

Fizemos a **mesma coisa**:
* **Subsistema Complexo (como o Interpretador):** É a biblioteca do Firebase Firestore, com suas classes e métodos `db`, `collection`, `query`, `doc`, `getDocs`, `setDoc`, `limit`, `startAfter`, etc.
* **Nosso Facade (como o `InterpretadorX`):** É o nosso novo módulo `dataService.js`.
* **Interface Simples (como o `eval()`):** São os nossos novos métodos, como `fetchTerms()`, `saveQuizResult()` e `fetchUserProfile()`.

Como nossa fachada foi criada especificamente para abstrair uma fonte de dados, ela também é comumente referenciada pelo padrão **Repository**.

## 3. Solução Adequada (O "Depois")

A solução implementada foi a criação do módulo `src/services/dataService.js`.

1.  **Encapsulamento:** Este módulo se tornou o **único** ponto de contato da aplicação com o `db` do Firestore. Toda a lógica de `getDocs`, `collection`, `query`, `doc`, etc., foi movida para dentro dele.
2.  **Abstração (Facade):** O serviço expõe métodos simples e semânticos que a UI entende. O componente `Termos.jsx`, por exemplo, não precisa mais saber sobre `limit` ou `startAfter`; ele apenas chama `dataService.fetchTerms(pageSize, lastDoc)`.
3.  **Desacoplamento:** Os componentes de UI (`Quiz.jsx`, `Termos.jsx`, etc.) foram refatorados. Todas as importações de `firebase/firestore` foram removidas, e eles agora apenas importam e utilizam o `dataService`.

### Contribuição para uma Solução Mais Adequada

Esta nova arquitetura, documentada no `diagramas_de_classe.md` (Diagrama Refatorado), é uma solução mais adequada porque:

* **Centraliza a Lógica de Dados:** Temos um **Ponto Único de Mudança** para toda a lógica de dados.
* **Aumenta a Coesão e Respeita o SRP:** Os componentes de UI agora têm alta coesão (focados apenas em UI), e o `dataService` tem alta coesão (focado apenas em dados).
* **Permite Testabilidade:** Os componentes de UI podem ser testados de forma isolada, "mocando" (simulando) as respostas do `dataService`.
* **Aumenta a Flexibilidade:** O backend pode ser trocado com impacto mínimo na aplicação, pois a UI depende da *abstração* (`dataService`) e não da *implementação* (`Firestore`).
