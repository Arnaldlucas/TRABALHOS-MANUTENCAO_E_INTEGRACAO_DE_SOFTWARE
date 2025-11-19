# Histórico de Mudanças (Changelog)

Todo o desenvolvimento notável neste projeto será documentado neste arquivo. O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.2.0] - 2025-11-17 (Manutenção Evolutiva - TP4)

### Added
- **Funcionalidade "Palavra do Dia":** Novo card no Dashboard que exibe um termo técnico aleatório diariamente para aumentar o engajamento.
- **Exclusão de Conta (LGPD):** Nova opção na página de Perfil permitindo que o usuário delete permanentemente sua conta e dados pessoais.
- **Regras de Segurança (Firestore):** Implementação de `firestore.rules` para garantir isolamento de dados entre usuários.

### Changed
- **Migração para TypeScript:** Todo o código base (`src/`) foi migrado de JavaScript (`.jsx`) para TypeScript (`.tsx`) para aumentar a segurança de tipagem e manutenibilidade.
- **Melhoria de Acessibilidade (A11y):** - Ajuste de contraste em botões de ação (verde escuro) para atender ao padrão WCAG AA.
    - Adição de `aria-label` em botões de ícone para suporte a leitores de tela.

## [1.1.0] - 2025-10-01

### Added
- **Conformidade com LGPD:** Adicionado um `checkbox` de consentimento para os Termos de Uso na página de Registro, adaptando o sistema a requisitos legais simulados.
- **Funcionalidade de Progressive Web App (PWA):** Implementada a capacidade da aplicação ser instalada em dispositivos desktop e móveis, adaptando-a para um novo ambiente de plataforma com suporte a acesso offline.
-**Atualização do React para 19.1.0:** O projeto utilizava React em versão desatualizada, o que poderia causar incompatibilidades e limitar recursos. A atualização para o React 19.1.0 garantiu estabilidade, segurança e alinhamento com o ecossistema mais recente.

