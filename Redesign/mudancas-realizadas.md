# Relatório de Mudanças - Etapa 1: Redesign

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Introdução

Este documento apresenta o comparativo "Antes e Depois" das melhorias de usabilidade implementadas no projeto MindTranslate. Conforme os requisitos do TP4, esta etapa foca em modernizar a interface e melhorar a experiência de uso (UX) de forma sistemática.

Cada mudança implementada está explicitamente relacionada à heurística de Nielsen que ela corrige, com base nos problemas identificados na `avaliacao-heuristica.md`.

## 2. Metodologia e Rastreabilidade

A condução da avaliação baseou-se nas diretrizes metodológicas do Nielsen Norman Group (NN/g) e no *Heuristic Evaluation Workbook*. Os problemas foram priorizados por severidade (Essencial, Importante, Desejável) e registrados como "Issues" no GitHub para garantir a rastreabilidade.

A tabela a seguir resume as 4 correções de usabilidade implementadas, a heurística violada e a Issue de rastreamento correspondente.

| Responsável | Mudança Implementada | Heurística(s) Violada(s) | Issue Rastreada |
| :--- | :--- | :--- | :--- |
| **João Victor** | Remoção de Ruído Visual (Tela Termos) | H8: Estética e Design Minimalista | `#15`  |
| **Nivaldo Yenar** | Correção de Inconsistência (Ícones) | H4: Consistência e Padrões | `#17` |
| **Nivaldo Yenar** | Adição de "Saída de Emergência" (Quiz) | H3: Controle e Liberdade do Usuário | `#18` |
| **Arnald Bentes Lucas**| Validação de Formulário Preditiva | H5: Prevenção de Erros / H9: Recuperação | `20` |

---

## 3. Mudanças de Redesign Implementadas

### Mudança 1: Remoção de Ruído Visual na Tela de Termos
* **Responsável:** João Victor
* **Issue Rastreada:** Resolve a Issue `#15`
* **Heurística Corrigida:** #8 - Estética e Design Minimalista.
* **Problema:** A tela "Termos" (`Termos.jsx`) exibia uma barra de busca desabilitada com o texto "A busca será implementada em uma futura versão".
* **Análise:** Esta mensagem é "ruído": é uma nota de desenvolvedor que vazou para a interface do usuário. A Heurística #8 diz que as interfaces não devem conter informações irrelevantes. Mostrar um componente que não funciona polui a tela e diminui a confiança do usuário.
* **Solução (Redesign Aplicado):** O elemento `<input>` e seu contêiner `<div>` foram **completamente removidos** do arquivo `CodigoFonte/src/pages/Termos.jsx`. A tela agora apresenta apenas o conteúdo funcional.

#### Evidências:

**ANTES (Interface com Ruído)**
![Barra de busca desabilitada na tela de Termos](prints/h8-termos-antes.png)

**DEPOIS (Interface Minimalista)**
![Tela de Termos limpa, sem a barra de busca](prints/h8-termos-depois.jpeg)

---

### Mudança 2: Correção de Inconsistência na Navegação Principal
* **Responsável:** Nivaldo Yenar
* **Issue Rastreada:** Resolve a Issue `#17` (Substitua o número)
* **Heurística Corrigida:** #4 - Consistência e Padrões.
* **Problema:** O ícone do link "Início" (gráfico de barras) no menu superior era idêntico ao ícone do card "Progressão de Aprendizado" no Dashboard.
* **Análise:** A Heurística #4 afirma que os usuários não devem ter que se perguntar se ações diferentes significam a mesma coisa. Usar o mesmo ícone (`BarChart3`) para dois destinos diferentes cria confusão.
* **Solução (Redesign Aplicado):** O ícone do link "Início" no componente `CodigoFonte/src/components/Layout.jsx` foi alterado de `BarChart3` para um ícone universal e inequívoco de "casa" (`Home`).

#### Evidências:

**ANTES (Ícones Duplicados e Inconsistentes)**
![Ícone de gráfico usado para 'Início' e 'Progressão'](./prints/h4-consistencia_antes.jpg)

**DEPOIS (Ícones Consistentes e Padrão)**
![Ícone de 'Casa' usado para 'Início', resolvendo a ambiguidade](./prints/h4-consistencia_depois.jpg)

---

### Mudança 3: Adição de "Saída de Emergência" no Quiz
* **Responsável:** Nivaldo Yenar
* **Issue Rastreada:** Resolve a Issue `#18` (Substitua o número)
* **Heurística Corrigida:** #3 - Controle e Liberdade do Usuário.
* **Problema:** A tela do `Quiz.jsx` não possuía um botão óbvio para "Sair" ou "Voltar".
* **Análise:** A Heurística #3 exige que o usuário tenha "saídas de emergência" claramente marcadas. Ao entrar no quiz, o usuário ficava "preso" em um fluxo, o que não é intuitivo.
* **Solução (Redesign Aplicado):** Foi adicionado um botão (com um ícone "X") no canto superior da tela `CodigoFonte/src/pages/Quiz.jsx`, permitindo ao usuário abandonar o quiz a qualquer momento.

#### Evidências:

**ANTES (Usuário "Preso" no Fluxo do Quiz)**
![Tela do Quiz sem opção de 'Sair' ou 'Voltar'](./prints/h3-liberdade_antes.jpg)

**DEPOIS (Usuário com Controle e Liberdade)**
![Tela do Quiz com um novo botão 'X' (Sair) visível no canto](./prints/h3-liberdade_depois.jpg)

---

### Mudança 4: Validação de Formulário Preditiva e Imediata
* **Responsável:** Arnald Bentes Lucas
* **Issue Rastreada:** Resolve a Issue `#20` (Substitua o número)
* **Heurísticas Corrigidas:** #5 (Prevenção de Erros) e #9 (Ajudar usuários a reconhecer, diagnosticar e recuperar-se de erros).
* **Problema:** O formulário de cadastro (`Register.jsx`) só informava os erros (ex: "As senhas não coincidem") *depois* que o usuário clicava em "Cadastrar".
* **Análise:** Isso é um fluxo ineficiente e frustrante. A Heurística #5 (Prevenção de Erros) diz que é melhor *prevenir* o erro. O sistema força o usuário a um envio inválido para só então diagnosticar o problema.
* **Solução (Redesign Aplicado):** Implementamos a **validação *inline*** no `CodigoFonte/src/pages/Register.jsx`. Adicionamos eventos `onChange` e `onBlur` para verificar *imediatamente* se as senhas batem, exibindo uma mensagem de erro instantânea e prevenindo o erro antes mesmo do envio.

#### Evidências:

**ANTES (Validação Apenas no Envio)**
![Formulário de Registro sem feedback, mesmo com senhas erradas](./prints/h5-validacao_antes.jpg)

**DEPOIS (Validação Imediata - Prevenção de Erro)**
![Formulário de Registro mostrando 'As senhas não coincidem' imediatamente após o usuário sair do campo](./prints/h5-validacao_depois.jpg)
