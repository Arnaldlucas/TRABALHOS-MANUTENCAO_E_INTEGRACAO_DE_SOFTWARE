# Contexto da Estrutura de Dados (Firestore)

Para complementar a `justificativa_design.md` e os diagramas, este documento detalha a estrutura de dados no Firebase Firestore.

O `dataService` (nosso Repository) foi projetado para encapsular e abstrair as operações de leitura e escrita nestas coleções.

## Estrutura das Coleções

Nosso banco de dados NoSQL está organizado da seguinte forma:

1.  **`terms` (Coleção Raiz)**
    * Armazena a lista de todos os termos de programação.
    * *Exemplo de Documento (ID: `array`)*:
        * `term`: "Array"
        * `translation`: "Vetor"
        * `description`: "Uma estrutura de dados que armazena uma coleção de elementos..."

2.  **`quizzes` (Coleção Raiz)**
    * Armazena os diferentes quizzes disponíveis.
    * *Exemplo de Documento (ID: `fundamentos`)*:
        * Contém uma subcoleção `questions`.
        * *Subcoleção `questions` (ID: `q1`)*:
            * `question`: "Qual o termo para 'function'?"
            * `options`: ["Função", "Variável", "Classe"]
            * `answer`: "Função"

3.  **`users` (Coleção Raiz)**
    * Armazena informações de perfil para cada usuário autenticado. O ID do documento corresponde ao `uid` do Firebase Auth.
    * *Exemplo de Documento (ID: `uid_do_usuario_exemplo`)*:
        * `name`: "Arnald Lucas"
        * `email`: "arnald.lucas@ufam.edu.br"
        * `createdAt`: Timestamp
        * Contém uma subcoleção `quizProgress`.
        * *Subcoleção `quizProgress` (ID: `timestamp_do_quiz_exemplo`)*:
            * `score`: 8
            * `totalQuestions`: 10
            * `percentage`: 80
            * `completedAt`: Timestamp

## Evidência Visual da Estrutura

Abaixo está um screenshot da nossa estrutura de coleções no console do Firebase, que ilustra visualmente a organização descrita acima.

---

`![Estrutura do Firestore](./estrutura_firestore.jng)`