# PAT2Math

> **Nota importante**: O PAT2Math foi desenvolvido na UNISINOS sob orientação da Profa. Dra. Patrícia Augustin Jaques Maillard, enquanto era parte do corpo docente do PPGC dessa universidade. O sistema não está mais no ar devido a essa mudança institucional. Atualmente, a Profa. Patrícia está liderando pesquisas inovadoras no PPGInf/UFPR, desenvolvendo um novo sistema que integra IA generativa para o ensino de programação. A professora recebe alunos interessados em mestrado e doutorado que desejem contribuir com essa linha de pesquisa promissora. Interessados podem entrar em contato através do e-mail patricia@inf.ufpr.br para discutir oportunidades de orientação e colaboração neste campo em expansão.

O **PAT2Math** (Personal Affective Tutor to Math) é um Sistema Tutor Inteligente dedicado ao auxílio na resolução de equações algébricas de 1º e 2º graus com uma incógnita, proporcionando uma experiência interativa e educativa para estudantes.

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Histórico e Desenvolvimento](#histórico-e-desenvolvimento)
- [Características do Sistema](#características-do-sistema)
- [Como Rodar](#como-rodar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Como Citar](#como-citar)
- [Licença](#licença)

## Sobre o Projeto

O PAT2Math é um Sistema Tutor Inteligente do tipo step-based que assiste os alunos na resolução de equações de 1º e 2º graus com uma incógnita. O sistema é capaz de:

- Resolver equações algébricas
- Corrigir os passos do aluno
- Exibir feedbacks que auxiliam o aprendiz a resolver os passos
- Permitir que o aluno solicite dicas em diferentes níveis de abstração
- Inferir o conhecimento do aluno no domínio (para equações de 1º grau)
- Guardar um histórico de resolução de equações do aprendiz

## Histórico e Desenvolvimento

O PAT2Math é um projeto coordenado pela Profa. Dra. Patricia Augustin Jaques Maillard e foi desenvolvido e aprimorado por diversos alunos de mestrado e doutorado do Programa de Pós-Graduação em Computação Aplicada (PPGC) da UNISINOS durante aproximadamente 15 anos de desenvolvimento.

O projeto integra áreas de pesquisa como Inteligência Artificial aplicada à Educação, sistemas tutores inteligentes, agentes pedagógicos animados e computação afetiva no contexto de ambientes inteligentes de aprendizagem.

## Características do Sistema

### Sistema Especialista

O PAT2Math possui um sistema especialista responsável por corrigir equações algébricas e verificar se os passos do aluno são corretos. É composto pelos módulos:

- **Step Analyzer (SA)**: Compara o passo do aluno com os passos possíveis gerados pelo SG
- **Step Generator (SG)**: Gera o próximo passo que o aluno poderia utilizar ou gera vários passos para resolução

O sistema especialista inclui:
- **Módulo Resolvedor**: Sistema baseado em regras de produção para resolver equações
- **Módulo Cognitivo**: Implementa a técnica do model tracing para verificar se as respostas são corretas
- **Módulo de Falsas Concepções**: Identifica misconceptions aplicadas pelo aluno em soluções incorretas

### Modelo de Aluno

O Modelo de Aluno do PAT2Math guarda:
- Informações sobre o perfil do aluno (nome, turma, escola)
- Histórico de passos utilizados para resolver equações
- Probabilidades de domínio do aluno nas unidades de conhecimento em equações algébricas de 1º grau

O sistema utiliza Redes Bayesianas Dinâmicas (RBD) para inferir o conhecimento do aluno.

### Interface PATEquation

O PAT2Math possui um editor de álgebra denominado PATEquation que:
- Apresenta as equações na interface gráfica
- Possibilita que o aluno entre com os passos no processo de resolução
- Exibe dicas em 5 níveis de abstração e feedbacks

## Como Rodar

### Pré-requisitos
- **Servlet Container**: Utilize um servidor como Tomcat ou Jetty. Servidores embutidos disponíveis em IDEs também são compatíveis.
- **Banco de Dados**: MySQL. Crie um banco de dados denominado `pat2math`.
- **Arquivos Necessários**:
  - Copie o conteúdo do diretório `divalite` para `WebContent/patequation`.
  - Copie as dependências presentes na pasta `lib` para `WebContent/WEB-INF`.

Para instruções mais detalhadas de instalação, consulte o [Manual de Instalação](https://www.dropbox.com/s/bguip423r5rv5ur/Instru%C3%A7%C3%B5es%20de%20instala%C3%A7%C3%A3o%20dos%20arquivos%20e%20programas%20necess%C3%A1rios.pdf?dl=0).

## Tecnologias Utilizadas
- **Java**: Linguagem principal para desenvolvimento do sistema.
- **MySQL**: Sistema de gerenciamento de banco de dados.
- **Servlets**: Tecnologia para criação de aplicações web.
- **HTML5/JavaScript**: Utilizados na interface PATEquation.

## Contribuindo
Contribuições são bem-vindas! Siga os passos abaixo para contribuir com o projeto:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Como Citar

Para utilizar o código ou conceitos do PAT2Math em trabalhos acadêmicos ou projetos, por favor cite o projeto e suas publicações relacionadas. 

Para mais informações específicas sobre artigos publicados e alunos orientados no âmbito do projeto, consulte o Currículo Lattes da Profa. Dra. Patricia Augustin Jaques Maillard: 
[http://lattes.cnpq.br/5723385125570881](http://lattes.cnpq.br/5723385125570881)

Sugestão de citações:

- JAQUES, P. A. et al. PAT2Math: Intelligent Tutoring System to assist in solving algebraic equations. Available at: (https://github.com/patriciajaques/pat2math). Accessed on: [access date].
- JAQUES, PA; Seffrin, Henrique; RUBI, G.; MORAIS, F.; GUILLARDI, C.; BITTENCOURT, I.; ISOTANI, S. (2013). Rule-based expert systems to support step-by-step guidance in algebraic problem solving: The case of the tutor PAT2Math. Expert Systems with Applications, p.5456-5465. (https://doi.org/10.1016/j.eswa.2013.04.004)

## Licença

Este projeto está licenciado sob a Licença Internacional Creative Commons Atribuição-NãoComercial 4.0 (CC BY-NC 4.0). Esta licença permite o uso não comercial, incluindo pesquisa acadêmica, com a devida atribuição. Para uso comercial, entre em contato com os autores. Para mais detalhes, consulte  [Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Uso Permitido

Este software está disponível gratuitamente para:
- Pesquisa acadêmica
- Ensino e educação
- Uso pessoal não comercial

Para qualquer uso comercial ou em produção, entre em contato com os autores para obter uma licença comercial.
