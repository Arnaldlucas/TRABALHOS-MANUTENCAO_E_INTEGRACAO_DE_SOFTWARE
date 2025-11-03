# Code Smells Corrigidos — Refatoração 3

## 🧩 Magic Number

### 🔎 Descrição
Um **Magic Number** ocorre quando valores literais (como `9`) são utilizados diretamente no código sem um significado explícito.

### 🔎 Solução Aplicada

Foi criada uma constante nomeada TERMS_PAGE_SIZE no arquivo src/config/constants.js, substituindo o valor fixo.

### ✅ Benefícios

- Melhora a legibilidade e expressividade do código.
- Facilita alterações futuras (basta mudar a constante).
- Segue o padrão Replace Magic Number with Symbolic Constant de Martin Fowler.

## 🔁 Duplicated Code
### 🔎 Descrição

O Código Duplicado foi identificado nas funções fetchInitialTerms e handleLoadMore dentro de Termos.jsx, onde a lógica de busca e mapeamento de termos do Firestore era repetida.

### 💡 Solução Aplicada

A lógica duplicada foi extraída para um módulo reutilizável src/services/dataService.js, concentrando a comunicação com o Firestore em um único ponto da aplicação.

### ✅ Benefícios
- Elimina duplicação de código (princípio DRY).
- Facilita manutenção e testes.
- Implementa o padrão Extract Function / Facade Pattern.
