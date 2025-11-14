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

A solução evolutiva consiste em **refatorar o componente para usar HTML semanticamente correto**, tratando as opções como controles interativos:

1.  **Semântica:** O `<ul>` será transformado em um `<fieldset>` com um `<legend>` (a pergunta). Cada `<li>` será substituído por um `<button>`. O uso de `<button>` nativo do HTML resolve 90% do problema, pois ele já é focável (`Tab`), ativável (`Enter`/`Espaço`) e anunciado corretamente por leitores de tela.
2.  **Estado ARIA:** O botão selecionado receberá o atributo `aria-pressed="true"` para informar programaticamente aos leitores de tela qual opção foi escolhida.
3.  **Feedback Visual:** A estilização de `focus` do Tailwind será aprimorada (`focus:ring-2 focus:ring-offset-2`) para garantir que o foco do teclado seja sempre visível e claro, conforme a WCAG.