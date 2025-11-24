# 📘 História de Usuário 01 — Autenticação (Login)

**Enquanto usuário cadastrado, quero informar meu e-mail e senha para acessar minha conta e utilizar o sistema.**

## ✅ Critérios de Aceitação

1. O sistema deve exibir um formulário contendo:
   * E-mail
   * Senha
   * Botão **“Entrar”**
2. Ao preencher o e-mail e a senha e clicar em **“Entrar”**, o sistema deve tentar autenticar o usuário.
3. Se o e-mail ou senha estiver incorreto:
   * O sistema deve exibir uma mensagem de erro.
4. Se as credenciais estiverem corretas:
   * O sistema deve redirecionar o usuário para a área interna (dashboard ou página inicial).
5. A tela deve possuir um link **“Cadastre-se”** direcionando para a página de registro.
6. Os campos de e-mail e senha devem ser editáveis.

## 🧠 Regras de Negócio Associadas

1. O e-mail deve ser válido (formato com “@” e domínio).
2. A senha não é exibida em texto aberto (campo password).
3. O login só é permitido se o usuário existir no banco e estiver ativo.
4. Se usar Firebase/JWT, a autenticação depende da API.
5. Redirecionamento somente após autenticação confirmada.
   
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/fe77b3ea-d42f-4d1c-a28a-fa6107b53d05" />

---

# 📘 História de Usuário 02 — Cadastro de Usuário (Criar Conta)

**Enquanto novo usuário, quero preencher meus dados pessoais e criar uma conta para poder acessar o sistema.**

## ✅ Critérios de Aceitação

1. Exibição de formulário com:
   * Nome completo
   * E-mail
   * Senha
   * Confirmar senha
   * Checkbox de aceite dos Termos de Uso
   * Botão **“Cadastrar”**
2. O botão **“Cadastrar”** deve permanecer desabilitado até:
   * Todos os campos estarem preenchidos
   * Termos de Uso marcados
3. Ao clicar em **Cadastrar**:
   * Validar:
     * Senhas iguais
     * E-mail válido
     * Aceite dos Termos
   * Se válido → criar conta e redirecionar
   * Se inválido → exibir erro
4. Link **“Entrar”** direcionando para login.

## 🧠 Regras de Negócio Associadas

1. Nome completo deve conter ao menos um sobrenome.
2. Senha deve seguir regras mínimas.
3. Confirmação deve ser idêntica à senha.
4. Sem aceitação dos termos → sem cadastro.
5. E-mail não pode estar cadastrado.
6. Se usar Firebase/Auth, depende da API responder com sucesso.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/44ace3fd-57c1-4cee-b059-1fcffd84a60c" />

---

# 📘 História de Usuário 03 — Acessar Dashboard Inicial

**Enquanto usuário autenticado, quero visualizar meu painel inicial com as principais funcionalidades.**

## ✅ Critérios de Aceitação

1. Exibir mensagem personalizada:
   * “Bem-vindo, [nome]!”
   * “Você já completou X quizzes.”
2. Exibir 3 cards:
   * **Tradução de Termos**
   * **Quiz Interativo**
   * **Progressão de Aprendizado**
3. Exibir card **Palavra do Dia**.
4. Botão **“Comece a aprender”**.
5. Menu superior:
   * Logo
   * Início
   * Termos
   * Quiz
   * Ícone de usuário
6. Dashboard somente para usuários autenticados.

## 🧠 Regras de Negócio Associadas

1. Nome exibido = nome do cadastro.
2. Quantidade de quizzes vem do banco.
3. Palavra do dia vem de algoritmo/API.
4. Cards devem redirecionar corretamente.
5. Não logado → redirecionado ao login.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/593c4773-daab-4b01-a21b-98614ad88b45" />

---

# 📘 História de Usuário 04 — Consultar Termos de Programação

**Enquanto usuário, quero visualizar uma lista de termos com definições.**

## ✅ Critérios de Aceitação

1. Exibir título **“Termos de Programação”**.
2. Exibir cada termo como card contendo:
   * Nome
   * Subtítulo
   * Definição
   * Palavra-chave final (em alguns)
3. Cards organizados em grade.
4. Página rolável.
5. Acesso pelo menu "Termos".
6. Menu deve manter:
   * Logo
   * Início
   * Termos (selecionado)
   * Quiz
   * Perfil
7. Conteúdo carregado imediatamente.

## 🧠 Regras de Negócio Associadas

1. Lista fixa ou carregada de BD/JSON.
2. Cada termo deve ter nome + descrição.
3. Padrão bilíngue: inglês + explicação.
4. Apenas usuários logados acessam.
5. Não há busca nem filtros.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/7238e718-4ea4-4092-a3a4-b38284cbd253" />

---

# 📘 História de Usuário 05 — Exibir Pergunta do Quiz

**Enquanto usuário, quero visualizar a pergunta atual e as alternativas.**

## ✅ Critérios de Aceitação

1. Progresso da pergunta
    * Exibir: **“Pergunta X de Y”**.
2. Enunciado
    * Exibir o texto da pergunta carregada.
3. Alternativas
    * Devem ser clicáveis.
    * Exibir no mínimo duas.
    * Exemplo: 4 alternativas exibidas.
4. Interface
    * Título: **“Quiz Interativo”**
    * Menu com **Início**, **Termos**, **Quiz**
    * Card centralizado contendo pergunta + alternativas

## 🧠 Regras de Negócio

1. Perguntas exibidas na ordem correta.
2. Sempre o mesmo nº de alternativas por pergunta.
3. Conteúdo deve corresponder ao cadastrado.
4. Só pode avançar após selecionar resposta.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/d916e37c-2f94-4749-b1b7-6ef079a48267" />

---

# 📘 História de Usuário 06 — Tela de Progresso do Quiz

**Enquanto usuário autenticado, quero visualizar meu progresso global nos quizzes.**

## ✅ Critérios de Aceitação

1. Exibir estatísticas:
   * Total de quizzes concluídos
   * Total de acertos
   * Desempenho médio (%)
2. Exibir histórico:
   * Nome do quiz
   * Data (DD/MM/AAAA)
   * Pontuação (X/10)
   * Porcentagem
3. Ordenação definida pelo sistema.
4. Botão **“Voltar ao Início”**.
5. Dados devem corresponder ao banco.
   
## 🧠 Regras de Negócio

1. **Desempenho médio** = (acertos totais / total de questões) × 100
2. Cada quiz finalizado atualiza estatísticas.
3. Dados são por usuário (ID).
4. Histórico deve seguir formatação padrão.

<img width="1918" height="1077" alt="image" src="https://github.com/user-attachments/assets/e63abdd6-07ea-4e4b-bac1-70df4e190942" />

---

# 📘 História de Usuário 07 — Palavra do Dia

**Enquanto usuário, quero visualizar uma palavra do dia.**

## ✅ Critérios de Aceitação

1. Exibir card com:
   * Ícone
   * Título
   * Palavra
2. Palavra muda diariamente.
3. Card centralizado com palavra em destaque.

## 🧠 Regras de Negócio

1. Seleção automática
2. Mesma palavra para todos no mesmo dia
3. Evitar repetição consecutiva

<img width="1577" height="300" alt="image" src="https://github.com/user-attachments/assets/43e75d7e-5236-4c20-a36d-8f94e5518694" />

---

# 📘 História de Usuário 08 — Gerenciar Perfil do Usuário

**Enquanto usuário autenticado, quero visualizar meus dados pessoais e opções de sessão.**

## ✅ Critérios de Aceitação

1. Informações do Usuário
  * Exibir nome completo
  * Exibir e-mail
  * Campos não editáveis
2. Botão “Sair da Sessão”
  * Redirecionar para login ao clicar.
3. Exclusão da Conta
  * Área destacada em vermelho
  * Texto “Excluir conta permanentemente.”
  * Botão com ícone de lixeira
  * Ação exclui conta

## 🧠 Regras de Negócio

1. Acesso somente autenticado
2. Nome/e-mail não podem ser editados nessa tela
3. Exclusão permanente
4. Logout encerra sessão imediatamente

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/394432ec-d6f9-483e-bb16-35d99f3f5860" />

---

# 📘 História de Usuário 09 — Botão “Comece a aprender”

**Como usuário autenticado, quero visualizar um botão que me leve à página de termos.**

## ✅ Critérios de Aceitação

1. Exibição
    * Botão aparece apenas para usuários logados
    * Texto: **“Comece a aprender”**
    * Botão em destaque
2. Ação
    * Redirecionar imediatamente para **/terms**
    * Navegador permite voltar ao dashboard
3. Estilo
    * Cor: **#2563EB (blue-600)**
    * Texto branco e negrito
    * Bordas arredondadas
    * Hover: **blue-700**
4. Erros
    * Se rota não existir → exibir mensagem
    * Se sessão expirar → redirecionar para /login

## 🧠 Regras de Negócio

1. Usuário deve estar autenticado
2. Página dos termos é privada
3. Navegação rápida prioritária
4. Permissões iguais para usuários e admins

<img width="350" height="125" alt="image" src="https://github.com/user-attachments/assets/cbc32dc3-9053-4665-a469-bbb97e0b31db" />

