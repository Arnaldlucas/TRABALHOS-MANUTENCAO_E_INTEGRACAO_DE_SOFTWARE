# Code Smell: Código Duplicado e Número Mágico

## 🧩 Código Duplicado
**Onde:** Dentro de `Termos.jsx` — funções `fetchInitialTerms` e `handleLoadMore`.

### Descrição
As duas funções realizavam consultas ao Firestore com código praticamente idêntico, variando apenas o ponto de início da paginação.

### Solução
A lógica foi extraída para o `dataService.js`, eliminando a duplicação.

---

## 🔢 Número Mágico
**Onde:** Limite de 9 termos por página (valor fixo no código).

### Descrição
O número 9 estava sendo usado diretamente na função `limit(9)` sem contexto semântico.

### Solução
Foi criada a constante `TERMS_PAGE_SIZE` em `src/config/constants.js`, promovendo legibilidade e manutenção futura.
