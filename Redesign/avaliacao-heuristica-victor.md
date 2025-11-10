# Manual de Avaliação Heurística

**AVALIADOR: Victor Gabriel Araújo**
**DATA: 09/11/2025**
**PRODUTO: MindTranslate no navegador desktop**

--- 

## **FUNÇÃO OU TELA: Início**

## 2. Correspondência entre o Sistema e o Mundo Real

* ## Prioridade de correção: Importante

#### :x: Problemas

A expressão (zes) é um jargão de programação ou um "placeholder" de template que vazou para a interface. É uma forma preguiçosa de lidar com o plural (1 quiz, 2 quizzes). Para o usuário, isso é ruído, parece um erro e não é uma linguagem natural. O sistema deveria ser inteligente o suficiente para exibir "1 quiz".

![problema H2 na tela de Início](prints/problemas-heuristicas/h2-inicio.jpeg)

#### :white_check_mark: Recomendações

Implementar uma lógica de pluralização simples no código. O sistema deve verificar o número e exibir "1 quiz" (no singular) ou "2 quizzes" (no plural), de forma automática e natural para o usuário.

## 4. Consistência e Padrões

* ## Prioridade de correção: Essencial

#### :x: Problemas

O ícone de "Início" (um gráfico de barras) no menu superior é idêntico ao ícone de "Progressão de Aprendizado" no card central. Isso cria uma enorme confusão. O usuário vê o mesmo ícone em dois lugares, mas eles representam duas coisas completamente diferentes: um é a "Página Inicial" (navegação) e o outro é a "Página de Progresso" (um destino).

![problema H4 na tela de Início](prints/problemas-heuristicas/h4-inicio.jpeg)

#### :white_check_mark: Recomendações

Substituir o ícone de "Início" no menu superior por um ícone universal de "casa" (home). Isso elimina a confusão e segue um padrão de design que os usuários reconhecem instantaneamente.

---

## **FUNÇÃO OU TELA: Termos**

## 8. Estética e Design Minimalista

* ## Prioridade de correção: Essencial

#### :x: Problemas

A barra de busca com o texto "A busca será implementada em uma futura versão". Esse texto é "ruído": é uma nota para o desenvolvedor ou gerente de produto, não para o usuário. Mostrar um componente quebrado é o oposto de um design minimalista e focado no essencial.

![problebla H8 na tela de Termos](prints/problemas-heuristicas/h8-termos.jpeg)

#### :white_check_mark: Recomendações

Remover esse elemento da tela e deixar o código comentado para desenvolvedores futuramente implementem a função.

---

## **FUNÇÃO OU TELA: Quiz**


## 3. Controle e Liberdade do Usuário

* ## Prioridade de correção: Essencial

#### :x: Problemas

Não há um botão "Voltar a Home" ou "Sair". O usuário não pode sair da tala de quiz por um atalho específico.

![problema H3 na tela de Quiz](prints/problemas-heuristicas/h3-quiz.jpeg)

#### :white_check_mark: Recomendações

Adicionar no canto superior direito ou esquerdo um botão com o ícone de X ou com os termo "Sair" ou "Voltar a Home".

---

## **FUNÇÃO OU TELA: Criar conta**

## 5. Prevenção de Erros

* ## Prioridade de correção: Essencial

#### :x: Problemas

Não há uma verificação se o usuário digitou a mesma senha o que pode levar ao erro pra somente depois a correção.

![problema H5 na tela de Criar conta](prints/problemas-heuristicas/h5-criar-conta.jpeg)

#### :white_check_mark: Recomendações

Elimine condições propensas a erros e faça a verificação de senha antes do envio
