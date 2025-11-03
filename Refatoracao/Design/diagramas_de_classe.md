# Diagramas de Classe: Antes e Depois da Refatoração

Esta seção apresenta a evolução da arquitetura do projeto, ilustrando visualmente o problema de design e a solução aplicada.

## 1. Diagrama Original (Antes da Refatoração)

O diagrama abaixo representa a arquitetura do projeto **ANTES** da aplicação do padrão Repository.

**Análise do Problema:**
Note as linhas de dependência (setas tracejadas) partindo de todas as classes `<<Page>>` (`DashBoard`, `Perfil`, `Termos`, `Quiz`, `Progresso`) e apontando diretamente para `FirebaseConfig`. Isso ilustra o problema de **Alto Acoplamento**, onde a camada de UI está intrinsecamente misturada com a camada de acesso a dados.

---

![Diagrama de Classes Original](./diagrama_original.png)

---

## 2. Diagrama Refatorado (Depois da Refatoração)

O diagrama abaixo representa a arquitetura do projeto **DEPOIS** da aplicação do padrão Repository, implementado como `dataService`.

**Análise da Solução:**
Note a mudança fundamental:
1.  As linhas de dependência das classes `<<Page>>` **não apontam mais** para `FirebaseConfig`.
2.  Elas agora apontam para a nova classe de abstração `dataService`.
3.  Apenas o `dataService` (e o `AuthProvider` para autenticação) possui dependência do `FirebaseConfig`.

Isso demonstra uma arquitetura limpa, desacoplada e aderente aos princípios de design, onde a UI está isolada dos detalhes de implementação do banco de dados.

---

![Diagrama de Classes Refatorado](./diagrama_refatorado.png)