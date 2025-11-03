#  MindTranslate - Código Fonte

<p align="center">
  Uma plataforma web interativa projetada para ajudar estudantes e desenvolvedores a dominar o vocabulário técnico do mundo da programação de forma visual, prática e gamificada.
</p>

<p align="center">
  <strong><a href="https://mindtranslate-git-main-arnald-lucas-projects.vercel.app">Acessar a Demo Ao Vivo</a></strong>
</p>


##  Sobre o Projeto

A barreira do jargão técnico é um dos maiores desafios para quem está entrando na área de tecnologia. O MindTranslate nasceu para resolver exatamente essa dor, oferecendo uma ferramenta centralizada para aprender, praticar e acompanhar o progresso no estudo dos termos essenciais da programação.

O projeto foi construído do zero como um case de estudo completo, demonstrando uma arquitetura de aplicação moderna com React e Firebase.

##  Funcionalidades

- **✅ Autenticação de Usuários:** Sistema completo de registro e login utilizando Firebase Authentication.
- **✅ Rotas Protegidas:** Acesso a páginas internas somente para usuários autenticados.
- **✅ Glossário de Termos Dinâmico:** Lista de termos e suas traduções/descrições, buscados em tempo real do Firestore.
- **✅ Busca Inteligente:** Funcionalidade de pesquisa instantânea para filtrar termos no glossário.
- **✅ Quiz Interativo:** Um quiz dinâmico que busca perguntas do Firestore e fornece feedback em tempo real.
- **✅ Persistência de Progresso:** Os resultados dos quizzes são salvos no perfil do usuário no Firestore.
- **✅ Perfil de Usuário:** Página de perfil que exibe dados combinados do Firebase Auth e do Firestore.
- **⬜ Acompanhamento de Progresso:** (Próxima feature) Uma dashboard para visualizar o histórico de quizzes e estatísticas de aprendizado.
- **⬜ Gamificação:** (Próxima feature) Sistema de pontos, níveis e conquistas para engajar o usuário.

## 🛠 Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas e robustas, focando em performance e escalabilidade.

- **Frontend:**
  - **React:** Biblioteca principal para a construção da interface de usuário.
  - **Vite:** Ferramenta de build extremamente rápida para o ambiente de desenvolvimento.
  - **React Router DOM:** Para gerenciamento de rotas e navegação.
- **Backend & Banco de Dados (BaaS):**
  - **Firebase:** Plataforma utilizada para:
    - **Authentication:** Gerenciamento de usuários.
    - **Firestore:** Banco de dados NoSQL para armazenar termos, quizzes e perfis.
- **Estilização:**
  - **Tailwind CSS:** Framework CSS utility-first para uma estilização rápida e consistente.
- **Ícones:**
  - **Lucide React:** Biblioteca de ícones leve e customizável.
- **Gerenciamento de Estado:**
  - **React Context API:** Para gerenciamento do estado de autenticação global de forma limpa e desacoplada.

##  Como Rodar o Projeto Localmente

Para executar o MindTranslate no seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Arnaldlucas/Mindtranslate.git
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Copie o conteúdo do exemplo abaixo e substitua pelos seus próprios dados do Firebase.

    **.env.local**
    ```
    VITE_FIREBASE_API_KEY="SUA_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="SEU_APP_ID"
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 👤 Contato

**ARNALD BENTES LUCAS**

- LinkedIn: www.linkedin.com/in/arnald-bentes-lucas

- E-mail: arnald.lucas@ufam.edu.br

---


# Trabalho Prático 2: Manutenção Adaptativa - Projeto MindTranslate - README

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![Disciplina](https://img.shields.io/badge/Disciplina-Manutenção%20e%20Integração%20de%20Software-blue)
![Universidade](https://img.shields.io/badge/Universidade-UFAM%20ICET-lightgrey)

---

## 1. Contexto do Trabalho

Este repositório documenta a aplicação prática dos conceitos de **Manutenção Adaptativa de Software** no projeto "MindTranslate", conforme os requisitos do TP2 da disciplina de Manutenção e Integração de Software (Semestre 2025-2).

O objetivo é demonstrar a capacidade de adaptar um sistema de software a mudanças em seu ambiente, incluindo a migração de APIs, a conformidade com novas regulamentações e a atualização de dependências críticas. O código-fonte completo da aplicação adaptada está localizado no diretório `/src`.

## 2. Sobre o Sistema "MindTranslate"

O MindTranslate é um ecossistema de aprendizado online, desenvolvido como uma Single-Page Application (SPA) interativa com React e Firebase, com o propósito de solucionar um dos maiores desafios para novos desenvolvedores: a barreira do vocabulário técnico. A plataforma ataca diretamente a dificuldade de reter jargões e conceitos complexos, oferecendo uma ferramenta de capacitação que acelera a fluência técnica de estudantes e profissionais em início de carreira, tornando-os mais confiantes e eficazes em seus estudos e no ambiente de trabalho.

O funcionamento da plataforma se baseia em um ciclo de aprendizado ativo e contínuo. Primeiramente, o usuário utiliza o glossário dinâmico para pesquisar e aprender termos técnicos, que são apresentados com definições claras e exemplos práticos. Em seguida, ele valida e solidifica seu conhecimento através de quizzes interativos gerados a partir do conteúdo estudado. Por fim, um painel de acompanhamento de progresso permite ao usuário visualizar suas estatísticas de desempenho, mantendo-o motivado e ciente de sua evolução ao longo da jornada de aprendizado.

## 3. Plano de Estratégia Adaptativa

As três estratégias de manutenção adaptativa foram planejadas e documentadas no arquivo `plano-estrategia.md`, que serviu como guia para a execução deste trabalho. As estratégias abordadas foram:

* **Adaptação a Novo Ambiente de Plataforma (PWA):** Esta manutenção adapta o sistema para um novo ambiente de plataforma, transformando-o em um Progressive Web App (PWA) para atender às expectativas de uso modernas.
* **Adaptação a Regulamentação (LGPD):** Inclusão de um campo de consentimento de Termos de Uso no formulário de registro.

## 4. Evidências e Documentação

Todo o processo de manutenção foi documentado seguindo as melhores práticas, com evidências de "antes e depois" para cada adaptação.

| Estratégia Adaptativa | Documento de Evidência | Status |
| :--- | :--- | :--- |
| **1. Adaptação a Regulamentação (LGPD)** | [`evidencia1.md`](./evidencia1.md) | ✅ Concluído |
| **2. Adaptação a Novo Ambiente de Plataforma (PWA)** | [`evidencia2.md`](./evidencia2.md) | ✅ Concluído |
| **3: Adaptação a Novo Ambiente de Plataforma (Atualização do React)** | [`evidencia3.md`](./evidencia3.md) | ✅ Concluído |

O histórico detalhado de todas as mudanças de código realizadas durante este trabalho pode ser consultado no arquivo [`CHANGELOG.md`](./CHANGELOG.md). O relatório final, com uma síntese e reflexão crítica sobre o processo, está disponível em [`RELATORIO.md`](./RELATORIO.md).

## 5. Estrutura do Repositório

* **/codigoFonte**: Contém o código-fonte completo da aplicação React "MindTranslate" após as adaptações.
* **plano-estrategia.md**: Documento que descreveu o plano para as 3 estratégias de manutenção.
* **evidencia[1-3].md**: Relatórios detalhados para cada uma das estratégias implementadas.
* **CHANGELOG.md**: Um registro cronológico de todas as mudanças significativas no código.
* **RELATORIO.md**: O relatório final consolidado do trabalho.

## 6. Equipe

* Arnald Bentes Lucas


# Relatório Final - Manutenção Adaptativa (TP2)

**Disciplina:** Manutenção e Integração de Software
**Semestre:** 2025-2
**Equipe:** Arnald

---

## 1. Introdução

Este relatório sintetiza o trabalho prático de **Manutenção Adaptativa** realizado no projeto MindTranslate. O objetivo foi aplicar duas estratégias distintas de adaptação para responder a mudanças no ambiente do software, conforme o plano de ação definido em `plano-estrategia.md`.

## 2. Síntese das Adaptações Realizadas

A seguir estão detalhadas as estratégias de manutenção que foram implementadas, com links para suas respectivas evidências.

---

### ✅ Estratégia 1: Adaptação a Cenário de Regulamentação (LGPD)

* **Problema Adaptativo:** O formulário de registro não solicitava o consentimento explícito do usuário aos Termos de Uso, o que não está em conformidade com regulamentações de proteção de dados como a LGPD.
* **Adaptação Implementada:** Foi adicionado um `checkbox` de consentimento obrigatório na tela de registro. A lógica do formulário foi alterada para que o botão "Cadastrar" só seja habilitado após o usuário marcar o campo, garantindo a conformidade.
* **Documento de Evidência:** **[`evidencia1.md`](./evidencia1.md)**

---

### ✅ Estratégia 2: Adaptação a Novo Ambiente de Plataforma (PWA)

* **Problema Adaptativo:** A aplicação operava exclusivamente como um site em uma aba de navegador, limitando a experiência do usuário por não ser instalável e não possuir capacidades offline.
* **Adaptação Implementada:** O sistema foi transformado em um Progressive Web App (PWA). Através da configuração de um Web App Manifest e um Service Worker, a aplicação agora pode ser instalada em dispositivos desktop e móveis, proporcionando uma experiência de uso mais integrada e resiliente.
* **Documento de Evidência:** **[`evidencia2.md`](./evidencia2.md)**

---

### ✅ Estratégia 3: Atualização de Dependências (React 19.1.0)

**Problema Adaptativo:** O projeto utilizava versões antigas e inconsistentes do React (react e react-dom em 19.0.0), o que poderia gerar incompatibilidades e impedir acesso a novos recursos.

**Adaptação Implementada:** As dependências foram atualizadas para o React 19.1.0 (incluindo react-dom e pacotes de tipagem), garantindo estabilidade, segurança e suporte às funcionalidades mais recentes do ecossistema.

* **Documento de Evidência:** **[`evidencia3.md`](./evidencia3.md)**

---

## 3. Conclusão final

A realização deste trabalho prático de manutenção adaptativa no projeto MindTranslate permitiu consolidar a importância de desenvolver sistemas com foco na evolutibilidade. A implementação do consentimento de Termos de Uso (LGPD) e a transformação da aplicação em um Progressive Web App (PWA) foram exemplos concretos de como um software precisa se ajustar a fatores externos, sejam eles regulatórios ou tecnológicos. Conclui-se que o sucesso dessas adaptações está diretamente ligado não apenas à implementação do código, mas também à utilização de uma arquitetura modular e de um processo de desenvolvimento estruturado, com versionamento e documentação, que garantem a integridade do sistema durante seu ciclo de vida.


# Descrição do Sistema: MindTranslate

O MindTranslate é uma plataforma web interativa projetada para auxiliar estudantes, desenvolvedores iniciantes e profissionais em transição de carreira a dominar o vocabulário técnico do mundo da programação. A aplicação ataca a barreira do jargão técnico, oferecendo uma ferramenta centralizada para aprender, praticar e acompanhar o progresso no estudo dos termos essenciais da tecnologia.

As funcionalidades principais incluem um glossário de termos dinâmico e pesquisável, um sistema de quiz interativo para testar o conhecimento, e um painel de progresso que exibe o histórico e as estatísticas do usuário, tudo suportado por um sistema de autenticação seguro.

# Arquitetura do MindTranslate

O sistema segue uma arquitetura de Single-Page Application (SPA) com um backend "serverless" (BaaS).

* **Frontend:** Construído com **React** e **Vite**, hospedado na **Vercel**. A interface é reativa e utiliza **Tailwind CSS** para estilização e **React Router** para navegação. O estado global de autenticação é gerenciado pela **Context API**.

* **Backend (BaaS):** A plataforma **Firebase** é utilizada para todos os serviços de backend:
    * **Firebase Authentication:** Gerencia o registro, login e sessões de usuário.
    * **Firestore Database:** Banco de dados NoSQL que armazena os dados da aplicação, como perfis de usuário (`users`), o glossário (`terms`) e o conteúdo dos quizzes (`quizzes`).

## Diagrama Simplificado

A criar...

##  Como Rodar o Projeto Localmente

Para executar o MindTranslate no seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Arnaldlucas/Mindtranslate.git
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Copie o conteúdo do exemplo abaixo e substitua pelos seus próprios dados do Firebase.

    **.env.local**
    ```
    VITE_FIREBASE_API_KEY="SUA_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="SEU_APP_ID"
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

# Contexto da Estrutura de Dados (Firestore)

Para complementar a `justificativa_design.md` e os diagramas, este documento detalha a estrutura de dados no Firebase Firestore.

O `dataService` (nosso Repository) foi projetado para encapsular e abstrair as operações de leitura e escrita nestas coleções.

## Estrutura das Coleções

Nosso banco de dados NoSQL está organizado da seguinte forma:

1.  **`terms` (Coleção Raiz)**
    * Armazena a lista de todos os termos de programação.
    * *Exemplo de Documento (ID: `array`)*:
        * `term`: "Array"
        * `translation`: "Vetor"
        * `description`: "Uma estrutura de dados que armazena uma coleção de elementos..."

2.  **`quizzes` (Coleção Raiz)**
    * Armazena os diferentes quizzes disponíveis.
    * *Exemplo de Documento (ID: `fundamentos`)*:
        * Contém uma subcoleção `questions`.
        * *Subcoleção `questions` (ID: `q1`)*:
            * `question`: "Qual o termo para 'function'?"
            * `options`: ["Função", "Variável", "Classe"]
            * `answer`: "Função"

3.  **`users` (Coleção Raiz)**
    * Armazena informações de perfil para cada usuário autenticado. O ID do documento corresponde ao `uid` do Firebase Auth.
    * *Exemplo de Documento (ID: `uid_do_usuario_exemplo`)*:
        * `name`: "Arnald Lucas"
        * `email`: "arnald.lucas@ufam.edu.br"
        * `createdAt`: Timestamp
        * Contém uma subcoleção `quizProgress`.
        * *Subcoleção `quizProgress` (ID: `timestamp_do_quiz_exemplo`)*:
            * `score`: 8
            * `totalQuestions`: 10
            * `percentage`: 80
            * `completedAt`: Timestamp

## Evidência Visual da Estrutura

Abaixo está um screenshot da nossa estrutura de coleções no console do Firebase, que ilustra visualmente a organização descrita acima.

---

`![Estrutura do Firestore](./estrutura_firestore.jng)`

# Diagramas de Classe: Antes e Depois da Refatoração

Esta seção apresenta a evolução da arquitetura do projeto, ilustrando visualmente o problema de design e a solução aplicada.

## 1. Diagrama Original (Antes da Refatoração)

O diagrama abaixo representa a arquitetura do projeto **ANTES** da aplicação do padrão Repository.

**Análise do Problema:**
Note as linhas de dependência (setas tracejadas) partindo de todas as classes `<<Page>>` (`DashBoard`, `Perfil`, `Termos`, `Quiz`, `Progresso`) e apontando diretamente para `FirebaseConfig`. Isso ilustra o problema de **Alto Acoplamento**, onde a camada de UI está intrinsecamente misturada com a camada de acesso a dados.

---

![Diagrama de Classes Original](./diagrama_original.png)

---

## 2. Diagrama Refatorado (Depois da Refatoração)

O diagrama abaixo representa a arquitetura do projeto **DEPOIS** da aplicação do padrão Repository, implementado como `dataService`.

**Análise da Solução:**
Note a mudança fundamental:
1.  As linhas de dependência das classes `<<Page>>` **não apontam mais** para `FirebaseConfig`.
2.  Elas agora apontam para a nova classe de abstração `dataService`.
3.  Apenas o `dataService` (e o `AuthProvider` para autenticação) possui dependência do `FirebaseConfig`.

Isso demonstra uma arquitetura limpa, desacoplada e aderente aos princípios de design, onde a UI está isolada dos detalhes de implementação do banco de dados.

---

![Diagrama de Classes Refatorado](./diagrama_refatorado.png)

# Justificativa da Refatoração: Padrão Fachada (Facade)

## 1. O Conceito: O Padrão Fachada

O padrão de projeto **Fachada (Facade)** tem como objetivo principal fornecer uma **interface simplificada e unificada** para um conjunto de interfaces ou classes de um subsistema complexo.

Em vez de forçar o código "cliente" (a parte do sistema que *usa* a funcionalidade) a conhecer todos os detalhes, classes e a ordem correta das chamadas de um subsistema, o padrão Facade o encapsula por trás de um único objeto (a "fachada").

Isso resulta em dois benefícios principais:
1.  **Simplicidade:** O cliente só precisa interagir com um objeto simples.
2.  **Desacoplamento:** O cliente não está mais "amarrado" aos detalhes internos do subsistema. Se o subsistema mudar internamente, apenas a Fachada precisa ser atualizada, e o cliente não é afetado.

### Um Exemplo Clássico: O Interpretador

O exemplo clássico de um interpretador ilustra isso perfeitamente:

> **O Problema (Sem Fachada):** Para executar um programa, o cliente precisa instanciar e coordenar múltiplos objetos de um subsistema complexo:
>
> ```java
> // Cliente conhece TODOS os detalhes internos
> Scanner s = new Scanner("prog1.x");
> Parser p = new Parser(s);
> AST ast = p.parse();
> CodeGenerator code = new CodeGenerator(ast);
> code.eval();
> ```
>
> **A Solução (Com Fachada):** Cria-se uma classe `InterpretadorX` que atua como a Fachada. Ela esconde toda essa complexidade:
>
> ```java
> // Implementação da Fachada
> class InterpretadorX {
>   // ... (construtor) ...
>   void eval() {
>     // Toda a complexidade vive AQUI DENTRO
>     Scanner s = new Scanner(arq);
>     Parser p = new Parser(s);
>     AST ast = p.parse();
>     CodeGenerator code = new CodeGenerator(ast);
>     code.eval();
>   }
> }
> ```
>
> **Resultado:** O código cliente torna-se trivial e desacoplado:
>
> ```java
> // Cliente só conhece a Fachada
> new InterpretadorX("prog1.x").eval();
> ```

---

## 2. Nossa Escolha: Aplicando a Fachada no Projeto

O problema que enfrentamos em nosso projeto era uma analogia direta ao exemplo do interpretador.

### O Problema (Antes da Refatoração)

* **Nosso "Subsistema Complexo" era o Firebase/Firestore.** Ele envolve múltiplas chamadas, configuração (`FirebaseConfig`), e conhecimento específico de métodos como `getDoc`, `setDoc`, `collection`, `onSnapshot`, etc.
* **Nosso "Cliente" eram as Pages (`DashBoard`, `Perfil`, `Termos`, `Quiz`).**

Antes da refatoração, cada Page precisava importar e interagir diretamente com o subsistema do Firebase. Isso causava **Alto Acoplamento**:
* As Pages estavam misturadas com a lógica de acesso a dados.
* Qualquer mudança na estrutura do Firestore (ex: mudar o nome de uma coleção) exigiria modificar *todas* as Pages.
* A manutenção era difícil e a substituição do Firebase por outro banco de dados seria impraticável.

### A Solução (Depois da Refatoração)

Para resolver isso, aplicamos o Padrão Fachada.

* **Nossa "Fachada" é a classe `dataService`.**
* **Nosso "Cliente" continuam sendo as Pages.**

Criamos o `dataService` para ser o **único ponto de contato** entre a UI (Pages) e o banco de dados (Firestore).

1.  **Encapsulamento:** Toda a complexidade do Firebase (`FirebaseConfig`, `getDoc`, `setDoc`, etc.) foi movida para *dentro* dos métodos do `dataService` (ex: `buscarDadosUsuario()`, `salvarProgressoQuiz()`).
2.  **Interface Simples:** As Pages agora só precisam chamar métodos simples e semânticos do `dataService`, sem nunca saber *como* ou *onde* os dados estão sendo buscados (ex: `dataService.buscarDadosUsuario(userId)`).

Assim como no exemplo `InterpretadorX` esconde o `Scanner` e o `Parser`, o nosso `dataService` esconde o `FirebaseConfig` e o `getDoc`.

O resultado é uma arquitetura limpa e desacoplada, como ilustrado visualmente na seção a seguir.

---

## 3. Diagramas de Classe: Antes e Depois da Refatoração

Esta seção apresenta a evolução da arquitetura do projeto, ilustrando visualmente o problema de design e a solução aplicada.

### 3.1. Diagrama Original (Antes da Refatoração)

O diagrama abaixo representa a arquitetura do projeto ANTES da aplicação do padrão Fachada/Repository.

**Análise do Problema:**
Note as linhas de dependência (setas tracejadas) partindo de todas as classes `<<Page>>` (DashBoard, Perfil, Termos, Quiz, Progresso) e apontando diretamente para `FirebaseConfig`. Isso ilustra o problema de **Alto Acoplamento**, onde a camada de UI está intrinsecamente misturada com a camada de acesso a dados.

![Diagrama de Classes Original](./Design/diagrama_original.png)

### 3.2. Diagrama Refatorado (Depois da Refatoração)

O diagrama abaixo representa a arquitetura do projeto DEPOIS da aplicação do padrão, implementado como `dataService`.

**Análise da Solução:**
Note a mudança fundamental:

* As linhas de dependência das classes `<<Page>>` não apontam mais para `FirebaseConfig`.
* Elas agora apontam para a nova classe de abstração `dataService`.
* Apenas o `dataService` (e o `AuthProvider` para autenticação) possui dependência do `FirebaseConfig`.

Isso demonstra uma arquitetura limpa, desacoplada e aderente aos princípios de design, onde a UI está isolada dos detalhes de implementação do banco de dados.

![Diagrama de Classes Refatorado](./Design/diagrama_refatorado.png)

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

## 2. Refatoração em Nível de Design (Arnald Bentes Lucas)

A refatoração de design foi a mudança mais impactante e estrutural do projeto.

### 2.1. Justificativa Principal (Problema e Solução)

**Problema (Alto Acoplamento):** A arquitetura original do MindTranslate sofria de alto acoplamento . Os componentes de UI (ex: `Quiz.jsx`, `Termos.jsx`, `Perfil.jsx`) importavam diretamente a instância do `db` do Firestore ** e executavam lógica de consulta (`getDocs`, `query`, `collection`, `setDoc`). Isso violava o Princípio da Responsabilidade Única (SRP) e tornava a manutenção complexa.

**Padrão Aplicado (Facade / Repository):** Aplicamos o padrão Facade (Fachada), conforme descrito no material de apoio (Engenharia de Software Moderna, Cap. 6) . O `dataService.js` foi criado para atuar como uma fachada que abstrai o "subsistema" complexo do Firestore.

**Contribuição:** A solução desacoplou completamente a UI da fonte de dados. Os componentes React agora chamam métodos simples (ex: `dataService.fetchTerms()`) e não têm conhecimento de como ou onde os dados são armazenados.

### 2.2. Links para Artefatos de Design

Toda a documentação detalhada desta refatoração, incluindo os diagramas "Antes" e "Depois" e o contexto do Firestore, está disponível na pasta `design/`:

* Justificativa Completa: [./design/justificativa_design.md](./Design/justificativa_design.md)
* Diagramas de Classe (Antes e Depois): [./design/diagramas_de_classe.md](./Design/diagramas_de_classe.md)
* Contexto do Firestore: [./design/contexto_do_firestore.md](./Design/contexto_do_firestore.md)

## 3. Refatorações em Nível de Código

Foram aplicadas quatro técnicas de refatoração para resolver "code smells" específicos, conforme exigido pelo TP3.

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

# Trabalhos de Manutenção e Integração do Sistema "MindTranslate"

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![Disciplina](https://img.shields.io/badge/Disciplina-Manutenção%20e%20Integração%20de%20Software-blue)
![Universidade](https://img.shields.io/badge/Universidade-UFAM%20ICET-lightgrey)

Este repositório documenta os trabalhos de **manutenções** aplicadas ao sistema "MindTranslate", como parte da disciplina de Manutenção e Integração de Software do Instituto de Ciências Exatas e Tecnologia (ICET) da Universidade Federal do Amazonas (UFAM).

---

## 🚀 Sobre o Sistema "MindTranslate"

O MindTranslate é um ecossistema de aprendizado online, desenvolvido como uma Single-Page Application (SPA) interativa com React e Firebase, com o propósito de solucionar um dos maiores desafios para novos desenvolvedores: a barreira do vocabulário técnico. A plataforma ataca diretamente a dificuldade de reter jargões e conceitos complexos, oferecendo uma ferramenta de capacitação que acelera a fluência técnica de estudantes e profissionais em início de carreira, tornando-os mais confiantes e eficazes em seus estudos e no ambiente de trabalho.
<p align="center">
  <strong><a href="https://mindtranslate-git-main-arnald-lucas-projects.vercel.app">Acessar a Demo Ao Vivo</a></strong>
</p>

## ✨ Principais Funcionalidades

O funcionamento da plataforma se baseia em um ciclo de aprendizado ativo e contínuo:

1.  **📖 Glossário Dinâmico:** Permite ao usuário pesquisar e aprender jargões e termos técnicos, apresentados com definições claras e exemplos práticos.
2.  **🧠 Quizzes Interativos:** Valida e solidifica o conhecimento através de questionários gerados a partir do conteúdo estudado no glossário.
3.  **📊 Painel de Progresso:** Oferece um dashboard para o usuário visualizar suas estatísticas de desempenho, acompanhando sua evolução e mantendo a motivação.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido como uma Single-Page Application (SPA) utilizando:

* **React:** Para a construção da interface de usuário interativa.
* **Firebase:** Como backend para autenticação, banco de dados e hosting.
* **HTML5 & CSS3:** Para a estrutura e estilização da aplicação.

##  Como Rodar o Projeto Localmente

Para executar o MindTranslate no seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Arnaldlucas/Mindtranslate.git
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Copie o conteúdo do exemplo abaixo e substitua pelos seus próprios dados do Firebase.

    **.env.local**
    ```
    VITE_FIREBASE_API_KEY="SUA_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="SEU_APP_ID"
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.


## 📂 Estrutura do Repositório

Este repositório está organizado da seguinte forma:

* `📁 CodigoFonte/`: Contém o código-fonte completo e funcional da aplicação MindTranslate, que serviu de base para os trabalhos de manutenção.
* `📁 Manutenção-Corretiva/`: Documenta todo o processo de manutenção corretiva, incluindo relatórios de bugs, análises de causa raiz e as soluções aplicadas no código.
* `📁 Manutenção-Adaptativa/`: Contém os relatórios e documentação referentes à manutenção adaptativa, detalhando as novas funcionalidades, melhorias e adaptações implementadas no sistema.

## 👨‍💻 Autores

* [Arnaldlucas](https://github.com/Arnaldlucas)
* _(Adicione aqui o nome e link de outros integrantes, se houver)_

---
