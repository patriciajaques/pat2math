# PAT2Math

> **Important note**: PAT2Math was developed at UNISINOS under the supervision of Prof. Dr. Patrícia Augustin Jaques Maillard, while she was part of the PPGC faculty at that university. The system is no longer available due to this institutional change. Currently, Prof. Patrícia is leading innovative research at PPGInf/UFPR, developing a new system that integrates generative AI for programming education. The professor welcomes Master's and PhD students interested in contributing to this promising line of research. Those interested can contact her via email at patricia@inf.ufpr.br to discuss supervision and collaboration opportunities in this expanding field.

**PAT2Math** (Personal Affective Tutor to Math) is an Intelligent Tutoring System dedicated to helping students solve 1st and 2nd degree algebraic equations with one unknown, providing an interactive and educational experience.

## Table of Contents
- [About the Project](#about-the-project)
- [History and Development](#history-and-development)
- [System Features](#system-features)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [How to Cite](#how-to-cite)
- [License](#license)

## About the Project

PAT2Math is a step-based Intelligent Tutoring System that assists students in solving 1st and 2nd degree equations with one unknown. The system is capable of:

- Solving algebraic equations
- Correcting student steps
- Displaying feedback to help learners solve steps
- Allowing students to request hints at different abstraction levels
- Inferring student knowledge in the domain (for 1st degree equations)
- Keeping a history of the student's equation-solving process

## History and Development

PAT2Math is a project coordinated by Prof. Dr. Patricia Augustin Jaques Maillard and has been developed and improved by various master's and doctoral students from the Graduate Program in Applied Computing (PPGC) at UNISINOS during approximately 15 years of development.

The project integrates research areas such as Artificial Intelligence applied to Education, intelligent tutoring systems, animated pedagogical agents, and affective computing in the context of intelligent learning environments.

## System Features

### Expert System

PAT2Math has an expert system responsible for correcting algebraic equations and verifying if the student's steps are correct. It consists of the following modules:

- **Step Analyzer (SA)**: Compares the student's step with possible steps generated by the SG
- **Step Generator (SG)**: Generates the next step the student could use or generates various steps for resolution

The expert system includes:
- **Solver Module**: A rule-based system for solving equations
- **Cognitive Module**: Implements the model tracing technique to verify if answers are correct
- **Misconceptions Module**: Identifies misconceptions applied by the student in incorrect solutions

### Student Model

The PAT2Math Student Model stores:
- Information about the student profile (name, class, school)
- History of steps used to solve equations
- Probabilities of student mastery of knowledge units in 1st degree algebraic equations

The system uses Dynamic Bayesian Networks (DBN) to infer student knowledge.

### PATEquation Interface

PAT2Math has an algebra editor called PATEquation that:
- Presents equations in the graphical interface
- Allows students to enter steps in the solving process
- Displays hints at 5 levels of abstraction and feedback

## How to Run

### Prerequisites
- **Servlet Container**: Use a server such as Tomcat or Jetty. Embedded servers available in IDEs are also compatible.
- **Database**: MySQL. Create a database named `pat2math`.
- **Required Files**:
  - Copy the contents of the `divalite` directory to `WebContent/patequation`.
  - Copy the dependencies in the `lib` folder to `WebContent/WEB-INF`.

For more detailed installation instructions, see the [Installation Manual](https://www.dropbox.com/s/bguip423r5rv5ur/Instru%C3%A7%C3%B5es%20de%20instala%C3%A7%C3%A3o%20dos%20arquivos%20e%20programas%20necess%C3%A1rios.pdf?dl=0).

## Technologies Used
- **Java**: Main language for system development.
- **MySQL**: Database management system.
- **Servlets**: Technology for creating web applications.
- **HTML5/JavaScript**: Used in the PATEquation interface.

## Contributing
Contributions are welcome! Follow the steps below to contribute to the project:

1. Fork this repository.
2. Create a branch for your feature (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a Pull Request.

## How to Cite

To use the code or concepts from PAT2Math in academic papers or projects, please cite the project and its related publications.

For more specific information about published articles and students supervised within the scope of the project, please refer to Prof. Dr. Patricia Augustin Jaques Maillard's Lattes Curriculum:
[http://lattes.cnpq.br/5723385125570881](http://lattes.cnpq.br/5723385125570881)

Suggested citations:
```
- JAQUES, P. A. et al. PAT2Math: Intelligent Tutoring System to assist in solving algebraic equations. Available at: (https://github.com/patriciajaques/pat2math). Accessed on: [access date].
- JAQUES, PA; Seffrin, Henrique; RUBI, G.; MORAIS, F.; GUILLARDI, C.; BITTENCOURT, I.; ISOTANI, S. (2013). Rule-based expert systems to support step-by-step guidance in algebraic problem solving: The case of the tutor PAT2Math. Expert Systems with Applications, p.5456-5465. (https://doi.org/10.1016/j.eswa.2013.04.004)
```

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0). This license allows non-commercial use, including academic research, with appropriate attribution. For commercial use, please contact the authors.

For more details, see [Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Permitted Use

This software is freely available for:
- Academic research
- Teaching and education
- Personal non-commercial use

For any commercial or production use, please contact the authors to obtain a commercial license.
