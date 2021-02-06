# Gerenciador de tarefas

Para configurar o seu ambiente é necessário:

1. Ter o [node.js](https://nodejs.org/en/download/) instalado em sua máquina.
1. Executar o comando '**npm install**' dentro da pasta raiz do projeto, afim de instalar todos os pacotes node utilizados.
1. Crie um arquivo chamado .ENV, na pasta raíz do projeto, de acordo com o [.env.example](https://github.com/MatheusAnciloto/task-manager-api/blob/main/.env.example) e adicione os dados de conexão do banco MySQL, uma porta para a API ser executada e também uma senha para gerar e comparar os tokens de acesso. 
    
    - Caso esteja usando windows adicione as variáveis de acordo com o [tutorial](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc736637(v=ws.10)?redirectedfrom=MSDN).

1. Execute o comando '**knex-migrate**' com '*npm run*' ou '*yarn*', em caso de problema você pode executar o comando direto: 'knex --knexfile knexfile.js migrate:latest'.
   
    - Caso ocorra o erro: '*Client does not support authentication protocol requested by server; consider upgrading MySQL client*', siga estes [passos](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server).

1. Por fim, execute o comando '*start*' utilizando '*npm run*' ou '*yarn*'.


Os testes podem ser realizados de acordo com as rotas criadas no arquivo [routes.js](https://github.com/MatheusAnciloto/task-manager-api/blob/main/src/routes.js). A rota para buscar as tarefas cadastradas possui paginação, você pode acessá-la informando um valor para '*page*' e um '*limit*'. Por exemplo: *http://localhost:8080/tasks?page=1&limit=2*.



