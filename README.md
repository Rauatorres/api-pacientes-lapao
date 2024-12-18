endpoints:

/login

- serve para fazer o login no app
- recebe como request os parâmetros "username" e "senha"
- retorna um json com os atributos "dadosLogin" e "consultas"
    - "dadosLogin" retorna um objeto com um atributo de confirmação de login "success" e todas as informações da conta do usuário (id, username, senha (criptografada), tipo e id_pessoa)
        - caso não seja possível fazer login, retorna success: false e um atributo "msg" que é uma mensagem especificando o erro
    - "consultas" retorna um array de objetos que representam as consultas que foram marcadas pelo dono da conta logada. Cada consulta é um objeto com os seguintes atributos: id, idpaciente, idconsulta, prioridade, data, status, motivo, data_fim, mes, pedido, classificacao, idunidadeprestadora, hora, idmedico, presenca, data_dig, exame_pdf, agen_pdf, obs, tfd, login, data_marcacao, impresso, idsetor, sms, loginmarcacao
        - caso o login tenha falhado, retorna uma array vazia

/cadastrar

- serve para cadastrar uma nova conta de usuário no app
- recebe como request os parâmetros "username", "senha", "tipo" e "idpessoa"
- retorna um json com os atributos "success" e "msg" caso "success" seja false


