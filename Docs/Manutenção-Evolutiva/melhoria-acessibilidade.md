# Justificativa da Melhoria de Acessibilidade (TP4)

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Melhoria de Acessibilidade: Navegação por Teclado e Semântica no Quiz

### 1.1. Problema Identificado (A Limitação Real)

Uma auditoria no componente `Quiz.jsx`, a funcionalidade *core* do MindTranslate, revelou uma falha de acessibilidade P0 (crítica) que **impede a navegação completa via teclado**.

* **Análise Técnica:** As opções de resposta são renderizadas como elementos `<li>` (item de lista) com um manipulador `onClick`.
* **Violação:** Elementos `<li>` não são interativos por natureza. Eles não são incluídos na ordem de `Tab` do navegador e não respondem a eventos de teclado como `Enter` ou `Espaço`.

### 1.2. Impacto na Experiência (Pessoas com Deficiência)

Esta implementação exclui, no mínimo, dois grupos de usuários:

1.  **Pessoas com Deficiência Motora:** Usuários que não podem usar um mouse e dependem 100% do teclado (ou dispositivos assistivos que simulam o teclado) para navegar. Para eles, o quiz está **quebrado**; eles podem ver as perguntas, mas não podem respondê-las.
2.  **Pessoas com Deficiência Visual (Leitores de Tela):** Um leitor de tela (como NVDA ou VoiceOver) anunciará os itens como "lista", não como "botões" ou "opções selecionáveis". A semântica está incorreta, e a interatividade é nula.

### 1.3. Solução Implementada (A Correção)

A solução evolutiva consiste em **refatorar o componente para usar HTML semanticamente correto** e **garantir um fluxo de foco lógico** para usuários de teclado.

1.  **Semântica Corrigida:** Cada `<li>` de resposta será substituído por um elemento `<button>` nativo. Isso resolve imediatamente a navegabilidade (`Tab`) e a ativação (`Enter`/`Espaço`), além de anunciar o elemento corretamente para leitores de tela ("botão").

2.  **Prevenção de Erros (Estado Desabilitado):** Assim que uma resposta for selecionada (`selectedAnswer` não for nulo), **todos** os botões de opção serão marcados como `disabled`. Isso impede cliques duplos e comunica claramente ao usuário que a ação para aquela pergunta está concluída.

3.  **Fluxo de Foco Eficiente:** No momento em que o usuário seleciona uma resposta, o botão "Próxima Pergunta" aparece. Para evitar que o usuário de teclado tenha que pressionar `Tab` desnecessariamente, vamos mover o foco **programaticamente** para o botão "Próxima Pergunta" assim que ele for renderizado.

4.  **Feedback Visual (Focus State):** A estilização de foco do Tailwind (`focus:ring-2 focus:ring-offset-2`) será adicionada a todos os botões (opções e "Próxima") para garantir que o usuário saiba exatamente onde está na página.
