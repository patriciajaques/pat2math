# README

O PAT2Math é um Sitema Tutor Inteligente voltado para equações algébricas.

## Como rodar
CLONAGEM E CONFIGURAÇÃO DO PAT2Math no Linux (Ubuntu 14.04 LTS)

Você vai precisar:

-Instalar o JAVA jdk 1.7

-Instalar o MySQL

-Instalar o Workbeach 6.3
	Importar o dump do banco do pat2math

-Instalar o git
	Clonar repositorio

-Instalar o Tomcat 7

-Inserir as dependências
	Copiar o conteúdo da pasta lib (bibliotecas do PAT2Math, solicitar para alguém do projeto) e colar na pasta "/pat2math/WebContent/WEB-INF/lib"

-Instalar o Eclipse Java EE
	Dynamic web projet ==> Selecionar o local que tem o clone

-Credenciais do Banco de Dados. Inserir (login e senha) nos seguintes arquivos:
	/pat2math/WebContent/WEB-INF/lib->view->springmvc-servlet.xml
	/pat2math/src/META-INF/persistence.xml

-Na aba Servers do Eclipse, clique em New Server
	Selecionar Tomcat 7 e o local onde está o tomcat

-No Eclipse:
	Clique com o botão direito no projeto
	Clique em "Properties"
	Clqiue em "Java Build Path"
	Clique em "Add Libray"
	Selecione o Server
	Clique em "Finish"

Pronto!
