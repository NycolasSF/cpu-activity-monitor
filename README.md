# BEM-VINDOS MONITORES !! :computer:

**Bom Dia/Tarde/Noite.**

![gif](cpu-activity-monitor.gif)

Esse projeto é sem dúvida incrível que desenvolvi, e queira compartilha com vocês. Um CPU MONITOR nos mostra um prévia do "por 
baixo dos panos" de tudo que ocorre em nossa máquina, cada sistema operacional tem o seu. Para acessar no *Windows* clique com o botão esquerdo do mouser na Barra de tarefas e selecione a opção Gerenciador de Tarefas, no *MAC* pesquise por Monitor de Atividades e no Linux no terminal digite *top*.
Esse projeto, consiste em viabilizar o uso de uma aplicação funcionando em todos os sistemas operacionais citados ( realizo em prol do estudo e aprimoramento de minhas habilidades ).

Nesse projeto, consumo a API do [Glances](https://nicolargo.github.io/) que me fornece todo os informações do computador em tempo real, e o [Blessed](https://github.com/chjj/blessed) junto com o  [Blessed-Contrib](https://github.com/yaronn/blessed-contrib) que juntos formam uma poderosa ferramenta para customizar o terminal.


## Inicializando e testando

Para testar você precisará do [**Node.js**](https://nodejs.org/en/download/), [**Glances**](https://nicolargo.github.io/glances/) e os opcionais [**Yarn**](https://classic.yarnpkg.com/pt-BR/docs/install/) e [**Nodemon**](https://www.npmjs.com/package/nodemon).

Após a instalação dos pacotes acima abra um terminal e execute:

> glances -w
> **ou**
> npm run glances
> **ou**
> yarn glances

Sua resposta deve ser algo parecico com: *Glances Web User Interface started on http://0.0.0.0:61208/*

**atenção:** o resultado deve ser igual á :61208, caso no for entre no arquivo Terminal.js e edite o **this.port** para o valor que aparecer no http://0.0.0.0:{porta}.


e depois:

> node src/index.js 
> **ou** 
> npm run start 
> **ou** 
> yarn start

--> **Seja Feliz**


## Autor
| [<img src="https://avatars3.githubusercontent.com/u/31997816?s=460&u=107452a7dfa9ec91a46f6fe7abced2ce57c6b2ce&v=4" width=115><br><sub>@NycolasSF</sub>](https://github.com/NycolasSF) |
| :---: |
:--> Até +_+ Vê <--: