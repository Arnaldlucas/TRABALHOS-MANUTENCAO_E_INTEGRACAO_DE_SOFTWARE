# Justificativa da Melhoria de Acessibilidade (TP4)

**Trabalho:** TP4 - Redesign e Manutenção Evolutiva  
**Projeto:** MindTranslate  
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner  

---

## 1. Melhoria de Acessibilidade: Auditoria de Contraste e Rótulos (WCAG AA)

### 1.1. Problema Identificado (Auditoria Crítica)

Uma auditoria de acessibilidade utilizando a ferramenta **Axe DevTools** (padrão da indústria) revelou falhas **P0 (críticas)** que impactavam diretamente a usabilidade do produto para usuários com deficiência.

#### 🔴 Violação 1: Contraste

Elementos interativos da interface (como botões) falhavam nos requisitos mínimos de contraste do **WCAG AA (4.5:1)**.

- **Análise Técnica:**  
  O botão _"Voltar ao Início"_ (`Progresso.tsx`) utilizava as classes `bg-green-600` e `text-white`, resultando em um contraste de **3.29:1**, tornando-o ilegível para usuários com baixa visão.

#### 🔴 Violação 2: Rótulos Semânticos

Botões com apenas ícones não possuíam rótulos acessíveis (`aria-label`), prejudicando a navegação por leitores de tela.

- **Análise Técnica:**  
  No `Layout.tsx`, os botões com os ícones `<User />` e `<Menu />` não tinham `aria-label`.  
  **Efeito prático:** leitores de tela anunciavam apenas “botão”, sem contexto.

---

### 1.2. Impacto na Experiência (Pessoas com Deficiência)

Essas violações afetavam diretamente:

- **Pessoas com Baixa Visão:**  
  Falta de contraste dificultava a leitura de textos em botões, especialmente para daltônicos (ex.: Protanopia).

- **Pessoas com Deficiência Visual (uso de leitores de tela):**  
  A ausência de rótulos significativos resultava em navegação confusa e frustrante.

---

### 1.3. Solução Implementada

As correções aplicadas garantem conformidade com o **WCAG AA** e seguem boas práticas de semântica em HTML.

#### 🟢 Correção de Contraste

Botão no `Progresso.tsx` atualizado:

- **Antes:** `bg-green-600 hover:bg-green-700`
- **Depois:** `bg-green-800 hover:bg-green-900`

✔️ **Resultado:** Contraste melhorado para **4.9:1**, passando nos testes da WCAG.

#### 🟢 Adição de Rótulos Acessíveis (aria-label)

No `Layout.tsx`, os botões receberam rótulos claros:

- Botão de Perfil: `aria-label="Abrir menu do usuário"`
- Botão de Menu: `aria-label="Abrir menu principal"`

✔️ **Resultado:** Os leitores de tela anunciam corretamente a função dos botões.

---

### 📊 Resultado da Auditoria

Após as correções, a auditoria com Axe DevTools reportou:

> **0 problemas críticos de acessibilidade** nas páginas auditadas.

---
