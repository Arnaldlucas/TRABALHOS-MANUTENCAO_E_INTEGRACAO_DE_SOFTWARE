# Registro de Implementação da Manutenção Evolutiva (TP4)

Este documento registra o "Antes e Depois" de cada funcionalidade e melhoria implementada, servindo como evidência técnica do trabalho realizado.

---

## 1. Melhoria de Acessibilidade (A11y): Contraste e Rótulos

* **Responsável:** Arnald 
* **Justificativa:** Conforme documentado em `melhoria-acessibilidade.md`, a auditoria do Axe DevTools apontou falhas críticas (WCAG AA) que impactavam usuários com baixa visão (contraste de cor) e usuários de leitores de tela (botões sem `aria-label`).
* **Pull Request (Evidência):** [#40](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/40)

### ANTES (Falhas Críticas de Contraste e Rótulos)

A auditoria do Axe DevTools reportou erros de:
1.  **Contraste Insuficiente:** O botão em `Progresso.tsx` usava `bg-green-600` com `text-white`, falhando no teste de contraste 4.5:1.
2.  **Botões sem Texto:** Os botões de ícone (Perfil e Menu) no `Layout.tsx` não tinham `aria-label`.

```tsx
// ANTES (Em: src/pages/Progresso.tsx)
<Link
  to="/dashboard"
  className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
>
  Voltar ao Início
</Link>

---
```
![Imagem do WhatsApp de 2025-11-17 à(s) 10 43 42_702524f7](https://github.com/user-attachments/assets/0104468b-30cb-4de2-9aa3-92409d9bfc04)

```
// DEPOIS (Em: src/pages/Progresso.tsx)
<Link
  to="/dashboard"
  className="px-6 py-2 bg-green-800 text-white font-semibold rounded hover:bg-green-900 transition"
  // CORREÇÃO: bg-green-800 e hover:bg-green-900 passam no teste de contraste.
>
  Voltar ao Início
</Link>
```
![Imagem do WhatsApp de 2025-11-17 à(s) 10 44 37_69f72dff](https://github.com/user-attachments/assets/14acdd0c-8e8c-40c1-8936-9e1d96a9668a)
```
// ANTES (Em: src/components/Layout.tsx)
<button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200/60 transition-colors">
  <User size={20} />
</button>

<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="p-2 rounded-md hover:bg-gray-200/60"
>
  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```
![Imagem do WhatsApp de 2025-11-17 à(s) 10 38 31_da889384](https://github.com/user-attachments/assets/e8a99585-2979-4d22-ad11-517433d898a4)


```
// DEPOIS (Em: src/components/Layout.tsx)
<button
  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200/60 transition-colors"
  aria-label="Abrir menu do usuário" // <-- CORREÇÃO: aria-label adicionado
>
  <User size={20} />
</button>

<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="p-2 rounded-md hover:bg-gray-200/60"
  aria-label="Abrir menu principal" // <-- CORREÇÃO: aria-label adicionado
>
  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```
![Imagem do WhatsApp de 2025-11-17 à(s) 10 34 07_8d56cd07](https://github.com/user-attachments/assets/e8348c3d-70dc-4433-993a-017c406df49e)

## 2. Funcionalidade 1: "Palavra do Dia" no Dashboard

- **Responsável:** João Victor  
- **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui a UI do `DashBoard.jsx` para ser mais dinâmica e aumentar o engajamento diário.  
- **Issue Rastreada:** `(link da issue aqui)`

### ANTES (Dashboard estático)

O Dashboard era estático e apenas exibia os cards de navegação.

*(João Victor: Insira aqui um print do `DashBoard.jsx` antigo)*

### DEPOIS (Dashboard dinâmico com "Palavra do Dia")

A lógica foi movida para um *hook* `useWordOfDay.ts` e um novo componente de UI renderiza a palavra do dia, melhorando a interface.

*(João Victor: Insira aqui um print do `DashBoard.tsx` novo, com o card "Palavra do Dia" visível, e um `diff` de código do `useWordOfDay.ts`)*

---

## 3. Funcionalidade 2: Exclusão de Conta de Usuário (LGPD)

- **Responsável:** Victor Gabriel  
- **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui a conformidade com a LGPD, adicionando o "direito de ser esquecido" ao perfil.  
- **Pull Request:** [#32](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/32)

### ANTES (Perfil sem exclusão)

A página `Perfil.jsx` não oferecia ao usuário a opção de remover sua própria conta.

<img width="1591" height="957" alt="Perfil-antes" src="https://github.com/user-attachments/assets/5242a8c5-3ecb-4fcc-b501-bc0abdedf30f" />

### DEPOIS (Perfil com opção de exclusão)

Migrei a página de Perfil para TypeScript (.tsx) e implementei a funcionalidade de exclusão de conta através de um novo hook isolado, o `useDeleteAccount.ts`. A interface recebeu um botão de exclusão com modal de confirmação e feedback visual, enquanto a lógica gerencia a remoção segura dos dados no Firebase (Auth e Firestore) de forma independente do serviço principal, evitando conflitos de código.

<img width="1591" height="957" alt="Perfil-depois" src="https://github.com/user-attachments/assets/e3baf767-c27b-4932-beda-6d0177dc371f" />
<img width="1591" height="957" alt="Perfil-depois-2" src="https://github.com/user-attachments/assets/699841d4-9bdd-44fe-a9eb-1554702a3ead" />

### Testes unitários: `useDeleteAccount`

- **Ferramentas:** Vitest + React Testing Library (Ambiente JSDOM)  
- **Estratégia:** Utilizamos *Mocks* para simular o Firebase (Auth e Firestore), o Router e o AuthContext, isolando a lógica e impedindo a exclusão de dados reais.  

**Casos de Teste:**
1. **Sucesso:** Verifica se `deleteDoc`, `deleteUser` e `logout` são chamados e se ocorre o redirecionamento para `/login`.  
2. **Erro:** Simula uma falha de conexão e valida se o sistema captura o erro sem redirecionar.  

**Execução:**  
Rode `npm run test`.

**Resultado Esperado:**
```plaintext
 ✓ src/features/profile/useDeleteAccount.test.ts (2 tests)
   ✓ deve deletar a conta com sucesso e redirecionar
   ✓ deve lidar com erros durante a exclusão

 Test Files  1 passed (1)
 PASS  Waiting for file changes...
