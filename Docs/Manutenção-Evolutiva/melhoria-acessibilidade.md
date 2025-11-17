# Justificativa da Melhoria de Acessibilidade (TP4)

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva
**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

# Melhoria de Acessibilidade (A11y): Contraste e Rótulos

**Responsável:** Arnald (Tech Lead)
**Ferramenta:** Axe DevTools

## Justificativa

Após uma auditoria de acessibilidade, foram identificadas duas falhas críticas (WCAG AA) que impactavam usuários com baixa visão e usuários de leitores de tela:

1.  **Contraste de Cor Insuficiente:** Elementos de UI (como botões verdes) usavam cores que não tinham contraste suficiente com o texto branco, tornando-os ilegíveis.
2.  **Botões sem Rótulo:** Botões de ícone (como "Perfil" e "Menu") não possuíam `aria-label`, tornando-os confusos para leitores de tela.
Essa mudança é para usuários com deficiência visual que usam leitores de tela.
Antes: O leitor de tela chegava no seu botão e dizia: "Botão." (O usuário ficava sem saber o que o botão fazia).

## Implementação

A correção envolveu a refatoração de classes de cor (ex: `bg-green-600` para `bg-green-800`) e a adição de `aria-label`s em componentes de layout, garantindo 0 problemas críticos no Axe.
