//Todos los middleswares para expres tienen (req(obj entrante), res(respuesta) y next(que siga para adelante la funcion))

const jwt = require('jsonwebtoken');
const { getById } = require('../model/users.model');

const checkToken = async (req, res, next) => {
    //Compribar si el TOKEN viene en el header Authorization
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera Autorization' });
    }
    const token = req.headers['authorization'];

    //Comprobar si el TOKEN es correcto
    //Si el token esta mal, verify lanza una excepcion
    let obj; //creo un objeto
    try {
        obj = jwt.verify(token, 'clave ultrasecreta');
        //asigno un valor al objeto
    } catch (err) {
        res.json({ fallo: 'error en el token' })
    }

    // Recuperar el usuario a partir del ID
    //console.log(obj); //saco el objeto por consola->
    //{ user_id: , exp:  , iat:  }
    const [result] = await getById(obj.user_id);
    //console.log(result[0].username);
    req.user = result[0].username; // Una vez comprobado el usuario, lo recupero para poder utilizarlo despues del check token, incluso en el apartado de empleados

    next();
}

const checkAdmin = (req, res, next) => {
    //Si ejecuto un codigo que va después de la ejecución del método checkToken, tengo disponible la variable req.user (que es el usuario logado)
    //Si el usuario logado es admin -> llamamos a next
    if (req.user.role !== 'admin') {
        return res.json({ fatal: 'Debes ser admin' })
    }
    next();
}


module.exports = {
    checkToken, checkAdmin
}