# Relatório Final - TP3 Refatoração (MindTranslate)

**Curso:** Manutenção e Integração de Software
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, Victor, Victor Gabriel, Illgner

---

## 1. Resumo das Refatorações Realizadas

Este trabalho prático aplicou um conjunto de refatorações de design e de código no projeto MindTranslate. O objetivo foi melhorar a estrutura interna do software, aumentar a manutenibilidade, reduzir o acoplamento e eliminar "code smells", tudo isso sem alterar o comportamento externo observável da aplicação, conforme os requisitos do TP3 **.

As refatorações foram divididas em duas categorias principais:

* **Refatoração de Design:** Aplicação do padrão Facade (Fachada) para desacoplar a camada de UI (Componentes React) da camada de acesso a dados (Firestore).
* **Refatoração de Código:** Aplicação de quatro técnicas específicas do catálogo de Martin Fowler para resolver "code smells" locais, como Código Duplicado, Componentes Grandes e Números Mágicos.

A execução do trabalho seguiu um plano de divisão de tarefas onde cada membro da equipe foi responsável por uma parte da implementação e documentação.

## 2. Refatoração em Nível de Design (Pessoa 1)

A refatoração de design foi a mudança mais impactante e estrutural do projeto.

### 2.1. Justificativa Principal (Problema e Solução)

**Problema (Alto Acoplamento):** A arquitetura original do MindTranslate sofria de alto acoplamento **. Os componentes de UI (ex: `Quiz.jsx`, `Termos.jsx`, `Perfil.jsx`) importavam diretamente a instância do `db` do Firestore ** e executavam lógica de consulta (`getDocs`, `query`, `collection`, `setDoc`). Isso violava o Princípio da Responsabilidade Única (SRP) e tornava a manutenção complexa.

**Padrão Aplicado (Facade / Repository):** Aplicamos o padrão Facade (Fachada), conforme descrito no material de apoio (Engenharia de Software Moderna, Cap. 6) **. O `dataService.js` foi criado para atuar como uma fachada que abstrai o "subsistema" complexo do Firestore.

**Contribuição:** A solução desacoplou completamente a UI da fonte de dados. Os componentes React agora chamam métodos simples (ex: `dataService.fetchTerms()`) e não têm conhecimento de como ou onde os dados são armazenados.

### 2.2. Links para Artefatos de Design

Toda a documentação detalhada desta refatoração, incluindo os diagramas "Antes" e "Depois" e o contexto do Firestore, está disponível na pasta `design/`:

* Justificativa Completa: [./design/justificativa_design.md](./Design/justificativa_design.md)
* Diagramas de Classe (Antes e Depois): [./design/diagramas_de_classe.md](./Design/diagramas_de_classe.md)
* Contexto do Firestore: [./design/contexto_do_firestore.md](./Design/contexto_do_firestore.md)

## 3. Refatorações em Nível de Código

Foram aplicadas quatro técnicas de refatoração para resolver "code smells" específicos, conforme exigido pelo TP3 **.

### Refatoração 1: Extrair Componente (Pessoa 3)

* **Code Smell:** Código Duplicado.
* **Problema:** As páginas `Perfil.jsx` e `Progresso.jsx` ** continham blocos de JSX idênticos para renderizar estados de "Loading" e "Error".
* **Solução:** Criamos dois componentes reutilizáveis (`LoadingState.jsx` e `ErrorState.jsx`) e substituímos o código duplicado pela importação desses novos componentes.
* **Link para Evidências:** [./codigo/refatoracao1/](./codigo/refatoracao1/) *(A Pessoa 3 deve criar esta pasta e adicionar os arquivos antes.jsx, depois.jsx e justificativa.md)*

### Refatoração 2: Decompor Componente (Pessoa 2)

* **Code Smell:** Componente Grande (God Component).
* **Problema:** O componente `Quiz.jsx` ** era responsável por três lógicas distintas: carregar dados, executar o quiz e exibir a tela de resultados.
* **Solução:** A lógica e o JSX da tela de resultados foram extraídos para um novo componente (`QuizResult.jsx`), simplificando `Quiz.jsx` e melhorando a coesão.
* **Link para Evidências:** [./codigo/refatoracao2/](./codigo/refatoracao2/) *(A Pessoa 2 deve criar esta pasta e adicionar os arquivos antes.jsx, depois.jsx e justificativa.md)*

### Refatoração 3: Substituir Número Mágico (Pessoa 3)

* **Code Smell:** Número Mágico.
* **Problema:** A lógica de paginação em `Termos.jsx` ** usava o valor `9` "hard-coded" (`const PAGE_SIZE = 9;`).
* **Solução:** O valor foi movido para um arquivo de configuração central (`src/config/constants.js`) e exportado como `TERMS_PAGE_SIZE`, melhorando a legibilidade e a manutenção.
* **Link para Evidências:** [./codigo/refatoracao3/](./codigo/refatoracao3/) *(A Pessoa 3 deve criar esta pasta e adicionar os arquivos antes.jsx, depois.jsx e justificativa.md)*

### Refatoração 4: Inverter Variável (Inline Variable) (Pessoa 4)

* **Code Smell:** Variável Temporária Desnecessária.
* **Problema:** O componente `NavLinkItem.jsx` ** declarava duas constantes (`activeClassName`, `inactiveClassName`) que eram usadas apenas uma vez, em um ternário simples, poluindo o escopo.
* **Solução:** As variáveis foram "inlinadas" diretamente no ternário `className`, tornando o código mais direto e legível.
* **Link para Evidências:** [./codigo/refatoracao4/](./codigo/refatoracao4/) *(A Pessoa 4 deve criar esta pasta e adicionar os arquivos antes.jsx, depois.jsx e justificativa.md)*

## 4. Análise Adicional de Refatoração

Conforme solicitado pelo TP3 **, analisamos também os tipos de refatoração e pares neutros.

### 4.1. Catálogo de Code Smells

Todas as justificativas de refatoração de código acima estão atreladas a um code smell. Os smells identificados e resolvidos foram:

* Código Duplicado (Resolvido pela Refatoração 1)
* Componente Grande (Resolvido pela Refatoração 2)
* Número Mágico (Resolvido pela Refatoração 3)
* Variável Temporária (Resolvido pela Refatoração 4)
* Alto Acoplamento (Resolvido pela Refatoração de Design)

* **Link para Catálogo de Smells:** [./smells/](./smells/) *(As Pessoas 2, 3 e 4 devem popular esta pasta com os arquivos .md correspondentes)*

### 4.2. Refatoração Planejada vs. Oportunista

**Planejada (Antecipada):** A aplicação do Padrão Facade (`dataService`) foi uma refatoração planejada. Foi uma decisão arquitetural estrutural, discutida pela equipe antes da implementação, visando resolver um problema de design central (Alto Acoplamento).

**Oportunista (No "calor" do momento):** A Refatoração 4 (Inverter Variável) em `NavLinkItem.jsx` ** foi oportunista. Durante a integração do `dataService` (Pessoa 4), o desenvolvedor notou o "smell" e aplicou a "Regra do Escoteiro", limpando o código que estava sendo modificado por outro motivo.

### 4.3. Par de Refatorações Neutras (A -> B -> A')

A Refatoração 4 (Inverter Variável) ** demonstra perfeitamente o caráter neutro da refatoração.

* **Refatoração A (Inline Variable):** Removemos as variáveis `activeClassName` e `inactiveClassName` e colocamos seus valores de string diretamente no JSX.
* **Refatoração B (Extract Variable):** Se, no código refatorado, aplicássemos a refatoração oposta ("Extrair Variável") naquelas strings, recriaríamos exatamente as variáveis `activeClassName` e `inactiveClassName`, revertendo a refatoração A e voltando ao estado original, provando que a transformação não altera o comportamento.

## 5. Principais Aprendizados e Dificuldades

**Aprendizados:** O principal aprendizado foi o impacto prático do desacoplamento. Antes da refatoração de design, o projeto era uma mistura de UI e lógica de dados. Após aplicar o padrão Facade com o `dataService`, o código ficou nitidamente separado em camadas, tornando-o muito mais profissional, testável e preparado para o futuro.

**Dificuldades:** A maior dificuldade foi a coordenação da equipe, pois 3 membros (Pessoas 2, 3, 4) dependiam da finalização da tarefa da Pessoa 1 (criação do `dataService.js`). Isso exigiu boa comunicação e gerenciamento de branchs no Git.

## Conclusão (Pessoa 5)

Após a integração de todas as refatorações, a equipe de QA (Pessoa 5) realizou um Teste de Regressão completo. A aplicação manteve 100% do seu comportamento externo observável (cadastro, login, execução

