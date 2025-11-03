# Relatório Final – Refatoração e Padrão Facade (TP3)

**Disciplina:** Manutenção e Integração de Software
**Semestre:** 2025-2
**Equipe:** Arnald, Nivaldo, Victor, Victor Gabriel, Illgner

---

## 1. Introdução

Este relatório apresenta a síntese do **Trabalho Prático 3 (TP3)** de **Refatoração** desenvolvido no projeto **MindTranslate**.
O objetivo foi aprimorar a **estrutura interna do software**, eliminando problemas de **acoplamento, duplicação de código e baixa coesão**, sem alterar o comportamento funcional da aplicação.

As modificações realizadas focaram em dois eixos principais:

1. **Refatoração de Design:** aplicação do padrão **Facade (Fachada)** para isolar a camada de apresentação (UI) do subsistema de dados (Firestore).
2. **Refatorações de Código:** uso de técnicas do catálogo de **Martin Fowler** para remover *code smells* e aumentar a legibilidade e a manutenibilidade do código.

---

## 2. Refatoração de Design: Aplicação do Padrão Facade

### ✅ Problema Identificado – Alto Acoplamento

Antes da refatoração, os componentes React (`Quiz.jsx`, `Termos.jsx`, `Perfil.jsx`, entre outros) acessavam diretamente o Firestore por meio do `FirebaseConfig`, executando consultas (`getDocs`, `setDoc`, `collection`) dentro da própria camada de UI.
Esse modelo violava o **Princípio da Responsabilidade Única (SRP)** e tornava o código difícil de manter, além de dependente da estrutura interna do banco de dados.

---

### ✅ Solução Implementada – Fachada `dataService`

Foi criado o módulo **`dataService.js`**, que atua como **camada de abstração** entre a interface e o Firestore.
Esse módulo encapsula toda a lógica de acesso e manipulação de dados, expondo apenas métodos semânticos e de alto nível, como:

```js
dataService.fetchTerms()
dataService.saveQuizProgress(userId, progress)
```

Dessa forma, os componentes React passaram a se comunicar exclusivamente com o `dataService`, que é o **único** responsável por interagir com o `FirebaseConfig`.
Isso resultou em um **baixo acoplamento** e em uma arquitetura mais limpa e sustentável.

---

### 📁 Documentos de Evidência

* **Justificativa do Design:** [`justificativa_design.md`](./Design/justificativa_design.md)
* **Contexto do Firestore:** [`contexto_do_firestore.md`](./Design/contexto_do_firestore.md)
* **Diagramas de Classe (Antes e Depois):** [`diagramas_de_classe.md`](./Design/diagramas_de_classe.md)

---

## 3. Refatorações em Nível de Código

Além da reestruturação arquitetural, foram aplicadas quatro refatorações pontuais para eliminar code smells detectados na base de código.
A seguir, cada uma delas é descrita individualmente:

Refatoração 1 — Extração de Componentes Reutilizáveis
Foi identificado código duplicado nas telas Perfil.jsx e Progresso.jsx relacionado ao tratamento de estados de carregamento e erro.
A solução adotada foi a extração de dois novos componentes reutilizáveis, LoadingState.jsx e ErrorState.jsx, que agora centralizam essa lógica e melhoram a manutenibilidade do código.
Evidência: disponível em ./codigo/refatoracao1/.

Refatoração 2 — Decomposição de “God Component”
O componente Quiz.jsx apresentava múltiplas responsabilidades, concentrando tanto a lógica do quiz quanto a exibição dos resultados.
Aplicou-se a técnica de Decompor Componente, extraindo a tela de resultados para o novo componente QuizResult.jsx.
Essa separação tornou o código mais legível e facilitou futuros testes e ajustes de UI.
Evidência: ./codigo/refatoracao2/.

Refatoração 3 — Substituição de Número Mágico
No arquivo Termos.jsx, havia o uso direto do número 9 no controle de paginação dos termos exibidos.
O valor foi substituído pela constante TERMS_PAGE_SIZE, definida em config/constants.js, tornando o código mais descritivo e flexível a mudanças futuras.
Evidência: ./codigo/refatoracao3/.

Refatoração 4 — Inversão de Variáveis Locais
No componente NavLinkItem.jsx, existiam variáveis locais intermediárias que apenas repassavam valores ao JSX, sem transformação significativa.
Essas variáveis foram removidas e seus valores utilizados diretamente, aplicando a técnica de Inline Variable, reduzindo a verbosidade e aumentando a clareza.
Evidência: ./codigo/refatoracao4/.

---

## 4. Análise Complementar

### 4.1. Code Smells Identificados e Corrigidos

Os principais *code smells* abordados foram:

* **Código Duplicado** → Refatoração 1
* **Componente Grande (God Component)** → Refatoração 2
* **Número Mágico** → Refatoração 3
* **Variável Temporária Desnecessária** → Refatoração 4
* **Alto Acoplamento (Design)** → Refatoração de Arquitetura com `dataService`

*(Catálogo completo disponível em [`./smells/`](./smells/))*

---

### 4.2. Tipos de Refatoração

* **Planejada:** Implementação do padrão **Facade** — refatoração arquitetural estratégica discutida e documentada previamente.
* **Oportunista:** Refatoração de “Inverter Variável” — aplicada espontaneamente durante o desenvolvimento, conforme a “Regra do Escoteiro”.

---

### 4.3. Par de Refatorações Neutras (A → B → A’)

A refatoração de **Inverter Variável** demonstrou neutralidade, pois poderia ser revertida com a operação oposta (“Extrair Variável”), retornando o código ao estado original sem impacto funcional.

---

## 5. Principais Aprendizados e Dificuldades

**Aprendizados:**

* O padrão **Facade** mostrou-se essencial para reduzir o acoplamento e simplificar a comunicação entre camadas.
* O código tornou-se mais **modular, testável e escalável**, aproximando-se das boas práticas de arquitetura limpa.
* A experiência reforçou a importância de combinar **refatorações arquiteturais e locais** para melhorar o sistema como um todo.

**Dificuldades:**

* Dependência sequencial entre tarefas — a criação do `dataService` era pré-requisito para as refatorações subsequentes.
* Necessidade de sincronização entre branches e controle de versão durante a integração final das alterações.

---

## 6. Conclusão

A refatoração do projeto **MindTranslate** resultou em uma arquitetura **mais desacoplada, modular e sustentável**.
A introdução do padrão **Facade** via `dataService` eliminou a dependência direta entre a camada de UI e o Firestore, enquanto as refatorações de código melhoraram a clareza e manutenibilidade do sistema.

Com o comportamento funcional preservado e a qualidade estrutural elevada, o TP3 atendeu integralmente aos objetivos propostos de **melhoria contínua do design e da manutenibilidade do software**.

---

Deseja que eu formate esse relatório também em **Markdown final pronto para entrega** (com cabeçalhos, negrito, tabelas e links formatados para GitHub)? Isso deixaria ele idêntico em estilo ao TP2.
