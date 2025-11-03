# Refatoração — Pacote 3: Termos e UI Comum

### Responsável: Nivaldo Yenar
### Foco: Página **Termos** e Componentes de UI Comum  
### Projeto: MindTranslate

---

## 📌 Resumo das Refatorações
Foram aplicadas refatorações em nível de código com foco na página **Termos** e na criação de componentes reutilizáveis (LoadingState e ErrorState).  
Além disso, o acesso direto ao Firestore foi isolado em um serviço (`dataService`), aplicando o padrão **Facade** para melhorar manutenção e reuso.

Refatorações aplicadas:
1. **Extract Function / Extract Module** — Criação do `dataService.js`.
2. **Replace Magic Number with Constant** — Introdução de `TERMS_PAGE_SIZE` em `src/config/constants.js`.
3. **Extract Component** — Criação de `LoadingState.jsx` e `ErrorState.jsx`.
4. **Replace Duplicate Code** — Reutilização dos novos componentes de UI na página `Termos.jsx`.

---

## 🧩 Refatorações Neutras
- Aplicar **Extract Function** e depois **Inline Function** no mesmo método resultaria no mesmo comportamento final, evidenciando neutralidade entre A e B.

---

## 🧠 Tipos de Refatoração
- **Planejada (Estruturada):** Extração do `dataService` e componentes de UI.  
- **Oportunista:** Substituição do número mágico 9 pela constante `TERMS_PAGE_SIZE`.

---

## 💡 Resultado Esperado
- Código modular e reutilizável.  
- Facilidade de manutenção e testes.  
- Redução de duplicação e acoplamento direto com o Firestore.  
- Melhoria na legibilidade e estrutura da aplicação.
