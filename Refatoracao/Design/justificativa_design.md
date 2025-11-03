# Justificativa da Refatoração: Padrão Fachada (Facade)

## 1. O Conceito: O Padrão Fachada

O padrão de projeto **Fachada (Facade)** tem como objetivo principal fornecer uma **interface simplificada e unificada** para um conjunto de interfaces ou classes de um subsistema complexo.

Em vez de forçar o código "cliente" (a parte do sistema que *usa* a funcionalidade) a conhecer todos os detalhes, classes e a ordem correta das chamadas de um subsistema, o padrão Facade o encapsula por trás de um único objeto (a "fachada").

Isso resulta em dois benefícios principais:
1.  **Simplicidade:** O cliente só precisa interagir com um objeto simples.
2.  **Desacoplamento:** O cliente não está mais "amarrado" aos detalhes internos do subsistema. Se o subsistema mudar internamente, apenas a Fachada precisa ser atualizada, e o cliente não é afetado.

### Um Exemplo Clássico: O Interpretador

O exemplo clássico de um interpretador ilustra isso perfeitamente:

> **O Problema (Sem Fachada):** Para executar um programa, o cliente precisa instanciar e coordenar múltiplos objetos de um subsistema complexo:
>
> ```java
> // Cliente conhece TODOS os detalhes internos
> Scanner s = new Scanner("prog1.x");
> Parser p = new Parser(s);
> AST ast = p.parse();
> CodeGenerator code = new CodeGenerator(ast);
> code.eval();
> ```
>
> **A Solução (Com Fachada):** Cria-se uma classe `InterpretadorX` que atua como a Fachada. Ela esconde toda essa complexidade:
>
> ```java
> // Implementação da Fachada
> class InterpretadorX {
>   // ... (construtor) ...
>   void eval() {
>     // Toda a complexidade vive AQUI DENTRO
>     Scanner s = new Scanner(arq);
>     Parser p = new Parser(s);
>     AST ast = p.parse();
>     CodeGenerator code = new CodeGenerator(ast);
>     code.eval();
>   }
> }
> ```
>
> **Resultado:** O código cliente torna-se trivial e desacoplado:
>
> ```java
> // Cliente só conhece a Fachada
> new InterpretadorX("prog1.x").eval();
> ```

---

## 2. Nossa Escolha: Aplicando a Fachada no Projeto

O problema que enfrentamos em nosso projeto era uma analogia direta ao exemplo do interpretador.

### O Problema (Antes da Refatoração)

* **Nosso "Subsistema Complexo" era o Firebase/Firestore.** Ele envolve múltiplas chamadas, configuração (`FirebaseConfig`), e conhecimento específico de métodos como `getDoc`, `setDoc`, `collection`, `onSnapshot`, etc.
* **Nosso "Cliente" eram as Pages (`DashBoard`, `Perfil`, `Termos`, `Quiz`).**

Antes da refatoração, cada Page precisava importar e interagir diretamente com o subsistema do Firebase. Isso causava **Alto Acoplamento**:
* As Pages estavam misturadas com a lógica de acesso a dados.
* Qualquer mudança na estrutura do Firestore (ex: mudar o nome de uma coleção) exigiria modificar *todas* as Pages.
* A manutenção era difícil e a substituição do Firebase por outro banco de dados seria impraticável.

### A Solução (Depois da Refatoração)

Para resolver isso, aplicamos o Padrão Fachada.

* **Nossa "Fachada" é a classe `dataService`.**
* **Nosso "Cliente" continuam sendo as Pages.**

Criamos o `dataService` para ser o **único ponto de contato** entre a UI (Pages) e o banco de dados (Firestore).

1.  **Encapsulamento:** Toda a complexidade do Firebase (`FirebaseConfig`, `getDoc`, `setDoc`, etc.) foi movida para *dentro* dos métodos do `dataService` (ex: `buscarDadosUsuario()`, `salvarProgressoQuiz()`).
2.  **Interface Simples:** As Pages agora só precisam chamar métodos simples e semânticos do `dataService`, sem nunca saber *como* ou *onde* os dados estão sendo buscados (ex: `dataService.buscarDadosUsuario(userId)`).

Assim como no exemplo `InterpretadorX` esconde o `Scanner` e o `Parser`, o nosso `dataService` esconde o `FirebaseConfig` e o `getDoc`.

O resultado é uma arquitetura limpa e desacoplada, como ilustrado visualmente na seção a seguir.

---

## 3. Diagramas de Classe: Antes e Depois da Refatoração

Esta seção apresenta a evolução da arquitetura do projeto, ilustrando visualmente o problema de design e a solução aplicada.

### 3.1. Diagrama Original (Antes da Refatoração)

O diagrama abaixo representa a arquitetura do projeto ANTES da aplicação do padrão Fachada/Repository.

**Análise do Problema:**
Note as linhas de dependência (setas tracejadas) partindo de todas as classes `<<Page>>` (DashBoard, Perfil, Termos, Quiz, Progresso) e apontando diretamente para `FirebaseConfig`. Isso ilustra o problema de **Alto Acoplamento**, onde a camada de UI está intrinsecamente misturada com a camada de acesso a dados.

![Diagrama de Classes Original](./Design/diagrama_original.png)

### 3.2. Diagrama Refatorado (Depois da Refatoração)

O diagrama abaixo representa a arquitetura do projeto DEPOIS da aplicação do padrão, implementado como `dataService`.

**Análise da Solução:**
Note a mudança fundamental:

* As linhas de dependência das classes `<<Page>>` não apontam mais para `FirebaseConfig`.
* Elas agora apontam para a nova classe de abstração `dataService`.
* Apenas o `dataService` (e o `AuthProvider` para autenticação) possui dependência do `FirebaseConfig`.

Isso demonstra uma arquitetura limpa, desacoplada e aderente aos princípios de design, onde a UI está isolada dos detalhes de implementação do banco de dados.

![Diagrama de Classes Refatorado](./Design/diagrama_refatorado.png)
