# Planejamento da Manutenção Evolutiva (TP4)

**Projeto:** MindTranslate
**Equipe:** Arnald, Nivaldo, João Victor, Victor Gabriel, Illgner

---

## 1. Nossa Visão para esta Evolução

Para este trabalho, nossa meta vai além de apenas adicionar novas "features". Estamos focados em **amadurecer o MindTranslate como um produto real**.

Isso significa que cada mudança foi pensada para fortalecer o projeto em quatro pilares essenciais:
1.  **Valor ao Usuário:** Tornar o app mais útil e engajante.
2.  **Segurança:** Proteger os dados dos nossos usuários.
3.  **Conformidade:** Respeitar as boas práticas e a lei (LGPD).
4.  **Manutenibilidade:** Garantir que o projeto seja estável e fácil de melhorar no futuro.

---

## 2. Nosso Plano de Ação em Fases

Para organizar a equipe e garantir uma entrega de qualidade, dividimos o trabalho em duas fases claras: uma de **alicerce** e outra de **construção**.

### Fase 1: O Alicerce

Antes de construir, precisamos preparar o terreno. O objetivo desta fase é fortalecer a fundação do projeto, pagando nossos principais "débitos técnicos".

* **Status:** ⛔ **Ninguém começa a Fase 2 até que esta etapa esteja concluída.**

* **O que será feito:**
    1.  **Migração para TypeScript:** Vamos migrar o projeto 100% para TypeScript. Isso não é apenas uma boa prática; é essencial para garantir que o código seja seguro, fácil de manter e pronto para crescer.
    2.  **Implementar Regras de Segurança (Security Rules):** Vamos "trancar" o banco de dados. Na prática, isso garante que cada usuário só possa ver e editar *seus próprios dados*, o que é um requisito básico de segurança.

### Fase 2: Evolução Paralela (Toda a Equipe)

Com a base fortalecida, a equipe começa a trabalhar em paralelo nas novas funcionalidades.

#### 1. Funcionalidade: "Palavra do Dia"
* **O que é?** Um novo card no painel principal que mostra uma palavra aleatória do glossário por dia.
* **Por que?** É um gancho de **engajamento**. Incentiva o usuário a abrir o aplicativo diariamente, tornando o aprendizado um hábito.
* **Responsável:** João Victor

#### 2. Funcionalidade: Repetição Espaçada
* **O que é?** O quiz deixará de ser aleatório e passará a usar um algoritmo que identifica quais termos o usuário está esquecendo e precisa revisar.
* **Por que?** Essa é a evolução **mais importante** do produto. O MindTranslate deixa de ser um "glossário" e se torna uma "ferramenta de estudo inteligente", que ativamente ajuda o usuário a memorizar.
* **Responsável:** Illgner

#### 3. Funcionalidade: Exclusão de Conta
* **O que é?** Um botão no perfil que permite ao usuário deletar permanentemente sua conta e todos os seus dados.
* **Por que?** Isso garante nossa **conformidade com a LGPD** (Lei Geral de Proteção de Dados) e respeita o "direito de ser esquecido" do usuário.
* **Responsável:** Victor Gabriel

#### 4. Melhoria: Acessibilidade (A11y) no Quiz
* **O que é?** Vamos refatorar o Quiz para que ele possa ser inteiramente usado apenas com o teclado (navegação por Tab, seleção com Enter/Espaço).
* **Por que?** Garante que o aplicativo seja **inclusivo** e possa ser usado por pessoas com diferentes necessidades de acessibilidade.
* **Responsável:** Nivaldo

---

## 3. Nosso Processo de Trabalho

Para que cinco pessoas possam trabalhar ao mesmo tempo sem gerar o caos, definimos um processo de engenharia claro, baseado em três princípios:

1.  **Trabalho Isolado (Branches):** Cada tarefa (e cada desenvolvedor) trabalha em uma "cópia" isolada do projeto. Ninguém mexe na versão principal, evitando o risco de "quebrar" o trabalho do outro.

2.  **Revisão por Pares (Pull Requests):** Nenhum código novo entra no projeto sem que, no mínimo, **um outro colega de equipe o revise e aprove**. Isso é o nosso controle de qualidade para garantir que estamos seguindo os padrões.

3.  **Prevenção de Conflitos:** Definimos uma estratégia inteligente para evitar "guerras" de código. Em vez de todos editarem os mesmos arquivos centrais, cada funcionalidade será construída em seus próprios arquivos separados (a estratégia de *hooks*).

---

## 4. Papéis da Equipe

* **Tech Lead (Arnald):**
    * Responsável por executar a **Fase 1 (Alicerce)**.
    * Garantir a integração final de todo o trabalho.
    * Consolidar a documentação final do projeto.

* **Desenvolvedores (Nivaldo, João Victor, Victor Gabriel, Illgner):**
    * Responsáveis por executar suas funcionalidades na **Fase 2**.
    * Seguir os padrões de qualidade definidos neste plano.
    * Participar ativamente da revisão de código (Pull Requests) dos colegas.
