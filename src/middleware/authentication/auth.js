const jwt = require('jsonwebtoken');

exports.auth = async function(req, res, next){

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({message: 'Token é necessário'});
    }


    //Bearer token
    const [ , token] = authHeader.split(' ');


    jwt.verify(token, `${process.env.TOKEN_SECRET}`, function(err, decodedToken){
        if(!err){
            res.locals.user = decodedToken.id;
            next();
        } else{
            return res.status(401).send({message: 'Token inválido', erro: err});
        }
    });
}