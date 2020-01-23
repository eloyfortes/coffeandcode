const mysql = require('mysql');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345678',
    database : 'coffe'
});


app.use(bodyParser.json());
app.use(cors());
connection.connect( (err) => {
    
    if (err) {
        console.log(err)
    } else {
        console.log("funcionou SKRRR")
    }
});

app.get('/users', (req, next) => {
    connection.query("SELECT * FROM usuarios", (err, res) => {
        next.send(res);
    });  
})

app.post('/users', (req, next) => {

    const user = {
        user: req.body.nome_usuario,
        tel: req.body.telefone_usuario,
        email: req.body.email_usuario,
        senha: req.body.senha_usuario

    };
    let sql = "INSERT INTO usuarios (nome_usuario, telefone_usuario, email_usuario, senha_usuario) VALUES (?,?,?,?)";
   

     connection.query(sql,[user.user, user.tel, user.email, user.senha], (err, res) => {
        
        console.log(err);
        if(err) {
            next.status(501).send(err);
        } else {
            next.status(201).send(res);
        }
    });
    

});

app.delete('/users/:id', (req, next) => {

    const p = req.params;
    console.log(p);

    let sql = "DELETE from usuarios where id_usuarios = ?";
   

     connection.query(sql,[p.id], (err, res) => {
        
        console.log(err);
        if(err) {
            next.status(501).send(err);
        } else {
            next.status(201).send(res);
        }
    });
    

});
app.listen(1000, () => {
   
});






