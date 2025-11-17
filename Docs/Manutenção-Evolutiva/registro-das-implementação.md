# Registro de Implementação da Manutenção Evolutiva (TP4)

Este documento registra o "Antes e Depois" de cada funcionalidade e melhoria implementada, servindo como evidência técnica do trabalho realizado.

---

## 1. Melhoria de Acessibilidade (A11y): Navegação por Teclado no Quiz

* **Responsável:** Joao Victor
* **Justificativa:** Conforme documentado em `melhoria-acessibilidade.md`, a funcionalidade principal do quiz era inacessível para navegação por teclado.
* **Issue Rastreada:** `(link da issue aqui)`

### ANTES (A Opção não era focável)

O código usava um `<li>` com `onClick`, impedindo o foco por `Tab`.

*(Nivaldo: Insira aqui um print do `Quiz.jsx` antigo, destacando a tag `<li>`)*

### DEPOIS (Opção focável e semântica)

O elemento foi refatorado para um `<button>`, que nativamente suporta foco e ativação por teclado, resolvendo a falha de acessibilidade.

*(Nivaldo: Insira aqui o `diff` de código do `Quiz.tsx` mostrando a mudança de `<li>` para `<button>`)*

---

## 2. Funcionalidade 1: "Palavra do Dia" no Dashboard

* **Responsável:** Nivaldo Yenar
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui a UI do `DashBoard.jsx` para ser mais dinâmica e aumentar o engajamento diário.
* **Pull Request:** [#37](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/37)

### ANTES (Dashboard Estático)

O Dashboard era estático e apenas exibia os cards de navegação.

![](https://github.com/user-attachments/assets/dcf9a652-8c2b-49f3-9b84-710762855bc1)


### DEPOIS (Dashboard Dinâmico com "Palavra do Dia")

A lógica foi movida para um *hook* `useWordOfDay.ts` e um novo componente de UI renderiza a palavra do dia, melhorando a interface.

![](https://github.com/user-attachments/assets/8019af57-ac62-497a-8672-7f6c375af840)

```js
// CodigoFonte/src/features/dashboard/useWordOfDay.ts

import { useState, useEffect } from "react";
import { dataService } from "../../services/dataService";
import { Term } from "../../services/dataService";

export function useWordOfDay() {
    const palavras = [
    "Framework",
    "Compilador",
    "API",
    "Hook",
    "Endpoint",
    "Algoritmo",
    "Variável",
    "Classe",
    "Objeto",
    "Deploy",
  ];
  const [palavra, setPalavra] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Pega o dia atual do ano (0–365)
    const hoje = new Date();
    const diaDoAno = Math.floor(
      (hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Seleciona a palavra com base no dia
    const palavraSelecionada = palavras[diaDoAno % palavras.length];

    setPalavra(palavraSelecionada);
    setLoading(false);
  }, []);

  return { palavra, loading };
}

```
---

# Testes Unitários: **useWordOfDay**

**Ferramentas:** Vitest + React Testing Library (Ambiente JSDOM)

### **Estratégia:**

O hook foi testado de forma isolada, sem dependências externas e sem Firebase.
Mockamos a data do sistema para garantir resultados determinísticos e verificamos o comportamento do estado (`palavra` e `loading`) em diferentes cenários.

### **Casos de Teste:**

* **Estado Inicial:**
  Confere se `loading` inicia como `true` e `palavra` inicia como `null`.

* **Palavra Selecionada:**
  Após simular a execução do efeito, valida se o hook retorna corretamente uma palavra presente na lista interna.

* **Datas Diferentes:**
  Simula três dias distintos e verifica se cada data gera automaticamente uma palavra correspondente (cálculo baseado no dia do ano).

### **Execução:**

Rode:

```bash
npm run test
```

### **Resultado Esperado:**

```
 ✓ src/features/dashboard/useWordOfDay.test.ts (3 tests)
   ✓ deve iniciar com loading e palavra nula
   ✓ deve gerar a palavra do dia corretamente
   ✓ deve gerar palavras diferentes para dias diferentes

 Test Files  1 passed (1)
 PASS  Waiting for file changes...
```

---

## 3. Funcionalidade 2: Exclusão de Conta de Usuário (LGPD)

* **Responsável:** Victor Gabriel
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui a conformidade com a LGPD, adicionando o "direito de ser esquecido" ao perfil.
* **Pull Request:** [#32](https://github.com/Arnaldlucas/TRABALHOS-MANUTENCAO_E_INTEGRACAO_DE_SOFTWARE/pull/32)

### ANTES (Perfil sem Exclusão)

A página `Perfil.jsx` não oferecia ao usuário a opção de remover sua própria conta.

<img width="1591" height="957" alt="Perfil-antes" src="https://github.com/user-attachments/assets/5242a8c5-3ecb-4fcc-b501-bc0abdedf30f" />

### DEPOIS (Perfil com Opção de Exclusão)

Migrei a página de Perfil para TypeScript (.tsx) e implementei a funcionalidade de exclusão de conta através de um novo hook isolado, o useDeleteAccount.ts. A interface recebeu um botão de exclusão com modal de confirmação e feedback visual, enquanto a lógica gerencia a remoção segura dos dados no Firebase (Auth e Firestore) de forma independente do serviço principal, evitando conflitos de código.

<img width="1591" height="957" alt="Perfil-depois" src="https://github.com/user-attachments/assets/e3baf767-c27b-4932-beda-6d0177dc371f" />

<img width="1591" height="957" alt="Perfil-depois-2" src="https://github.com/user-attachments/assets/699841d4-9bdd-44fe-a9eb-1554702a3ead" />

### Testes Unitários: `useDeleteAccount`

**Ferramentas:** Vitest + React Testing Library (Ambiente JSDOM).

**Estratégia:** Utilizamos **Mocks** para simular o Firebase (Auth e Firestore), o Router e o AuthContext, isolando a lógica e impedindo a exclusão de dados reais.

**Casos de Teste:**
1.  **Sucesso:** Verifica se `deleteDoc`, `deleteUser` e `logout` são chamados e se ocorre o redirecionamento para `/login`.
2.  **Erro:** Simula uma falha de conexão e valida se o sistema captura o erro sem redirecionar.

**Execução:**
Rode `npm run test`.

**Resultado Esperado:**
```text
 ✓ src/features/profile/useDeleteAccount.test.ts (2 tests)
   ✓ deve deletar a conta com sucesso e redirecionar
   ✓ deve lidar com erros durante a exclusão

 Test Files  1 passed (1)
 PASS  Waiting for file changes...
```

---

## 4. Funcionalidade 3: Repetição Espaçada (Lógica Base)

* **Responsável:** Illgner
* **Justificativa:** Conforme `planejamento-da-evolucao.md`, esta *feature* evolui o sistema de um simples quiz para uma ferramenta de estudo inteligente.
* **Issue Rastreada:** `(link da issue aqui)`

### ANTES (Progresso Simples)

A página `Progresso.jsx` apenas listava resultados passados.

*(Illgner: Insira aqui um print do `Progresso.jsx` antigo)*

### DEPOIS (Lógica de Revisão Ativa)

Foi criado um *hook* `useSpacedRepetition.ts` que analisa o histórico e calcula os termos que precisam de revisão. A UI da página `Progresso.tsx` agora exibe essa informação ativamente.

*(Illgner: Insira aqui um print do `Progresso.tsx` novo, mostrando a UI de "Termos a Revisar", e um `diff` de código do `useSpacedRepetition.ts`)*
