# Justificativa da Refatoração de Design: Padrão Repository (Facade)

Este documento justifica a escolha e a aplicação de um padrão de projeto para resolver um problema de design fundamental identificado no projeto MindTranslate.

## 1. Problema de Design Identificado (O "Antes")

A análise da arquitetura original do projeto, documentada em `diagramas_de_classe.md` (Diagrama Original), revelou um problema de design crítico: **Alto Acoplamento** e **Violação do Princípio da Responsabilidade Única (SRP)**.

**Code Smells Identificados:**
* **Alto Acoplamento (High Coupling):** Os componentes da camada de visualização (React Pages, como `Termos.jsx`, `Quiz.jsx`, `Perfil.jsx`) estavam diretamente acoplados à implementação da camada de dados. Eles importavam `db` (a instância do Firestore) diretamente do `firebase-config.js` e executavam consultas específicas do Firebase (`getDocs`, `collection`, `query`, `doc`, `setDoc`).
* **Inveja de Funcionalidade (Feature Envy):** Nossos componentes de UI "invejavam" as funções do Firestore. Eles continham lógica complexa de acesso a dados que claramente pertencia a outra camada da aplicação.

### Por que isso é um problema?

Esta arquitetura é inadequada e viola as boas práticas de engenharia de software pelos seguintes motivos:

1.  **Baixa Manutenibilidade:** Se a estrutura da coleção "users" no Firestore fosse renomeada (ex: para "perfis"), ou se um campo mudasse, seríamos forçados a "caçar" e modificar múltiplos componentes de UI, tornando a manutenção cara e suscetível a erros.
2.  **Violação do SRP:** Os componentes de UI (ex: `Quiz.jsx`) tinham múltiplas responsabilidades: 1) Renderizar a interface do quiz, 2) Gerenciar o estado da UI e 3) Saber *como* buscar e salvar dados no Firestore.
3.  **Dificuldade de Teste:** É complexo e custoso realizar testes unitários em componentes de UI que fazem chamadas reais a um banco de dados externo.

## 2. Padrão de Projeto Aplicado: Repository (com Facade)

Para resolver esse problema, aplicamos o padrão de projeto **Repository**. Este padrão atua como uma **Facade** (Fachada) para a camada de dados.

### Justificativa da Escolha

O padrão Repository foi escolhido por ser a solução ideal para mediar a comunicação entre o domínio da aplicação (nossos componentes React) e a fonte de dados (Firestore). Ele cria uma **camada de abstração** que esconde (encapsula) toda a complexidade da lógica de acesso aos dados.

#### Decisão de Design: `dataService` vs. `FirestoreService`

Uma decisão de design importante foi nomear nosso serviço de `dataService.js` (um nome abstrato) em vez de `FirestoreService.js` (um nome de implementação).

* **Por quê?** O objetivo da abstração é desacoplar a UI dos *detalhes* do banco de dados. Nossos componentes React não devem *saber* que estão falando com o Firestore. Eles apenas pedem "dados" ao "serviço de dados".
* **Vantagem:** Se no futuro migrarmos o backend do Firestore para uma API REST, apenas o *interior* do `dataService.js` precisará ser modificado. Os componentes da UI (`Quiz.jsx`, `Termos.jsx`, etc.) permanecerão **intocados**, pois eles continuam chamando `dataService.fetch