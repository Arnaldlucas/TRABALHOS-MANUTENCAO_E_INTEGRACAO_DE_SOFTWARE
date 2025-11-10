# Relatório de Mudanças - Etapa 1: Redesign

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Introdução

Este documento apresenta o comparativo "Antes e Depois" das melhorias de usabilidade implementadas no projeto MindTranslate. Conforme os requisitos do TP4], esta etapa foca em modernizar a interface e melhorar a experiência de uso (UX) de forma sistemática.

Cada mudança implementada está explicitamente relacionada à heurística de Nielsen que ela corrige, com base nos problemas identificados na `avaliacao-heuristica.md`.

## 2. Metodologia da Avaliação Heurística

A condução da avaliação baseou-se nas diretrizes metodológicas propostas pelo Nielsen Norman Group (NN/g), conforme descrito no artigo *[How to Conduct a Heuristic Evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)*.

Como instrumento central para a coleta de dados, foi adotado o *Heuristic Evaluation Workbook* oficial do NN/g. Este artefato foi  traduzido para o português e adaptado pela equipe para o formato Markdown.

Essa adaptação teve como objetivo facilitar o registro sistemático e o rastreamento das violações de usabilidade identificadas nas telas do sistema, servindo como o principal artefato de documentação dos problemas encontrados.

Para a priorização dos problemas de usabilidade catalogados, foi empregada uma escala de classificação de severidade. Esta escala, alinhada à metodologia já utilizada na elicitação de requisitos do projeto, categoriza os *issues* em três níveis: **Essencial**, **Importante** e **Desejável**. Isso permite à equipe focar os esforços de correção nos itens de maior impacto para o usuário.

A tabela a seguir resume as 5 correções de usabilidade implementadas, a heurística violada e a Issue de rastreamento correspondente.

| Responsável | Mudança Implementada | Heurística(s) Violada(s) | Issue Rastreada |
| :--- | :--- | :--- | :--- |
| **João Victor** | Remoção de Ruído Visual (Tela Termos) | H8: Estética e Design Minimalista |[Issue #16](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/issues/16) |
| **Nivaldo Yenar** | Correção de Inconsistência (Ícones) | H4: Consistência e Padrões |[Issue #17](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/issues/17)|
| **Nivaldo Yenar** | Adição de "Saída de Emergência" (Quiz) | H3: Controle e Liberdade do Usuário |[Issue #18](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/issues/18)|
| **Victor Gabriel** | Linguagem Natural no Dashboard | H2: Correspondência entre o sistema e o mundo real |[Issue #19](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/issues/19)|
| **Arnald Bentes Lucas**| Validação de Formulário Preditiva | H5: Prevenção de Erros / H9: Recuperação |[Issue #20](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/issues/20)|

## 3. Mudanças de Redesign Implementadas

### Mudança 1: Remoção de Ruído Visual na Tela de Termos
* **Responsável:**  João Victor
* **Heurística Corrigida:** #8 - Estética e Design Minimalista.
* **Problema:** A tela "Termos" (`Termos.jsx`) exibia uma barra de busca desabilitada com o texto "A busca será implementada em uma futura versão".
* **Análise:** Esta mensagem é "ruído": é uma nota de desenvolvedor que vazou para a interface do usuário. A Heurística #8 diz que as interfaces não devem conter informações irrelevantes. Mostrar um componente que não funciona polui a tela e diminui a confiança do usuário.
* **Solução (Redesign Aplicado):** O elemento `<input>` e seu contêiner `<div>` foram **completamente removidos** do arquivo `CodigoFonte/src/pages/Termos.jsx`. A tela agora apresenta apenas o conteúdo funcional (a lista de termos), resultando em um design mais limpo e focado.

#### Evidências:

**ANTES (Interface com Ruído)**

![Barra de busca desabilitada na tela de Termos](prints/h8-termos-antes.png)

**DEPOIS (Interface Minimalista)**

![Tela de Termos limpa, sem a barra de busca](prints/h8-termos-depois.jpeg)

---

### Mudança 2: Correção de Inconsistência na Navegação Principal
* **Responsável:** Nivaldo Yenar
* **Heurística Corrigida:** #4 - Consistência e Padrões.
* **Problema:** O ícone do link "Início" (gráfico de barras) no menu superior era idêntico ao ícone do card "Progressão de Aprendizado" no Dashboard.
* **Análise:** A Heurística #4 afirma que os usuários não devem ter que se perguntar se ações ou ícones diferentes significam a mesma coisa. Usar o mesmo ícone (`BarChart3`) para dois destinos diferentes (Navegação para Home vs. Navegação para Progresso) cria confusão e quebra a consistência interna do sistema.
* **Solução (Redesign Aplicado):** O ícone do link "Início" no componente `CodigoFonte/src/components/Layout.jsx` foi alterado de `BarChart3` para um ícone universal e inequívoco de "casa" (`Home`). Isso restaura a consistência e segue um padrão de design reconhecido por todos os usuários.

#### Evidências:

**ANTES (Ícones Duplicados e Inconsistentes)**

![Ícone de gráfico usado para 'Início' e 'Progressão'](./prints/h4-consistencia_antes.jpg)

**DEPOIS (Ícones Consistentes e Padrão)**

![Ícone de 'Casa' usado para 'Início', resolvendo a ambiguidade](./prints/h4-consistencia_depois.jpg)

---

### Mudança 3: Adição de "Saída de Emergência" no Quiz
* **Responsável:** Nivaldo Yenar
* **Heurística Corrigida:** #3 - Controle e Liberdade do Usuário.
* **Problema:** A tela do `Quiz.jsx` não possuía um botão óbvio para "Sair" ou "Voltar".
* **Análise:** A Heurística #3 exige que o usuário tenha "saídas de emergência" claramente marcadas para sair de um estado indesejado. Ao entrar no quiz, o usuário ficava "preso" em um fluxo e a única forma de sair era pela navegação principal, o que não é intuitivo para uma tarefa em tela cheia.
* **Solução (Redesign Aplicado):** Foi adicionado um botão (com um ícone "X") no canto superior da tela `CodigoFonte/src/pages/Quiz.jsx`. Este botão funciona como uma saída de emergência clara, permitindo ao usuário abandonar o quiz a qualquer momento e retornar ao Dashboard, dando-lhe controle total.

#### Evidências:

**ANTES (Usuário "Preso" no Fluxo do Quiz)**

![Tela do Quiz sem opção de 'Sair' ou 'Voltar'](./prints/h3-liberdade_antes.jpg)

**DEPOIS (Usuário com Controle e Liberdade)**

![Tela do Quiz com um novo botão 'X' (Sair) visível no canto](./prints/h3-liberdade_depois.jpg)


---

### Mudança 4: Linguagem Natural no Dashboard
* **Responsável:** Victor Gabriel
* **Heurística Corrigida:** #2 - Correspondência entre o Sistema e o Mundo Real.
* **Problema:** O texto no DashBoard.jsx exibia "Você já completou 1 quiz(zes)...".
* **Análise:** A expressão (zes) é um jargão de programador (placeholder) que "vazou" para a interface. A Heurística #2 exige que o sistema "fale a língua do usuário". Esse texto quebra a naturalidade e passa uma impressão de sistema inacabado.
* **Solução (Redesign Aplicado):** Foi implementada uma lógica de pluralização simples (operador ternário) no CodigoFonte/src/pages/DashBoard.jsx. O sistema agora verifica o número e exibe a frase correta e natural: "Você já completou 1 quiz" (singular) ou "Você já completou 5 quizzes" (plural).

#### Evidências:

**ANTES (Linguagem de Programador na UI)**

![Texto '1 quiz(zes)' visível no Dashboard](./prints/h2-linguagem_antes.jpg)

**DEPOIS (Linguagem Natural e Fluida)**

![Texto corrigido para '1 quiz' (singular) no Dashboard](./prints/h2-linguagem_depois.jpg)
![Texto corrigido para '2 quizzez' (Plural) no Dashboard](./prints/h2-linguagem_depois1.jpg)

---

### Mudança 5: Validação de Formulário Preditiva e Imediata
* **Responsável:** Arnald Bentes Lucas
* **Heurísticas Corrigidas:** #5 (Prevenção de Erros) e #9 (Ajudar usuários a reconhecer, diagnosticar e recuperar-se de erros).
* **Problema:** O formulário de cadastro (`Register.jsx`) só informava os erros (ex: "As senhas não coincidem") *depois* que o usuário preenchia todos os campos e clicava em "Cadastrar".
* **Análise:** Isso é um fluxo ineficiente e frustrante. A Heurística #5 (Prevenção de Erros) diz que é melhor *prevenir* o erro. O sistema força o usuário a um envio inválido para só então diagnosticar o problema.
* **Solução (Redesign Aplicado):** Implementamos a **validação *inline*** no `CodigoFonte/src/pages/Register.jsx`. Adicionamos um evento `onBlur` (disparado quando o usuário sai do campo) para os campos "Senha" e "Confirme a senha". Assim que o usuário termina de digitar a confirmação, o sistema verifica *imediatamente* se as senhas batem, exibindo uma mensagem de erro (ou sucesso) instantânea, prevenindo o erro antes mesmo do envio.

#### Evidências:

**ANTES (Validação Apenas no Envio)**

![Formulário de Registro sem feedback, mesmo com senhas erradas](./prints/h5-validacao_antes.jpg)

**DEPOIS (Validação Imediata - Prevenção de Erro)**

![Formulário de Registro mostrando 'As senhas não coincidem' imediatamente após o usuário sair do campo](./prints/h5-validacao_depois.jpg)
