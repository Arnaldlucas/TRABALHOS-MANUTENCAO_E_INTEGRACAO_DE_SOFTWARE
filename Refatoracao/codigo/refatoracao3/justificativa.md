
# Justificativa — Refatoração 3 (Constantes e UI Comum)

## 🎯 Objetivo
Esta refatoração teve como propósito principal melhorar a legibilidade, reutilização e manutenção do código da página **Termos**, reduzindo a duplicação lógica e substituindo valores literais fixos por constantes configuráveis.

---

## 🚨 Problemas Identificados

### 1. Número Mágico
O código utilizava o valor literal `9` diretamente nas funções de paginação do Firestore:
```js
limit(9);
```
Esse valor não tinha significado explícito, dificultando a compreensão e a alteração do comportamento da aplicação.
Se fosse necessário mudar o número de itens por página, seria preciso procurar e alterar o valor manualmente em vários lugares.

### 2. Código Duplicado

As funções fetchInitialTerms e handleLoadMore dentro do arquivo Termos.jsx repetiam a mesma lógica de consulta e mapeamento de dados:
exemplo: 
```j
const documentSnapshots = await getDocs(query(...));
const termsData = documentSnapshots.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
```
Essa duplicação aumentava o acoplamento entre a camada de apresentação (UI) e a camada de dados (Firestore), tornando a manutenção mais complexa e propensa a erros.

## 🧩 Ações de Refatoração Realizadas

### Criação de constante configurável

- Foi criado o arquivo src/config/constants.js com a constante TERMS_PAGE_SIZE para substituir o valor fixo 9.
- Essa mudança segue o padrão Replace Magic Number with Symbolic Constant de Martin Fowler.

### Criação de componentes reutilizáveis de UI

- Foram criados os componentes LoadingState.jsx e ErrorState.jsx para padronizar a exibição dos estados de carregamento e erro.
- Isso reduziu a duplicação de código e promoveu consistência visual na aplicação.

### Extração da lógica de dados para um serviço dedicado

- A lógica de comunicação com o Firestore foi movida para o arquivo src/services/dataService.js, aplicando o padrão Facade.
- A página Termos.jsx agora apenas consome funções do dataService, sem lidar diretamente com o Firestore.

## 🧠 Tipos de Refatoração Aplicados

- Replace Magic Number with Symbolic Constant (Capítulo 9 — Engenharia de Software Moderna)
- Extract Function / Extract Module (Facade Pattern) (Martin Fowler — Refactoring: Improving the Design of Existing Code)
- Extract Component (Aplicado aos novos componentes de interface)

## ✅ Conclusão

- A refatoração trouxe ganhos significativos de qualidade no código, alem de tornar a página Termos mais limpa e de fácil manutenção;
- Permitiu a reutilização de componentes visuais e constantes;
- Reduziu o risco de erros e inconsistências futuras.

