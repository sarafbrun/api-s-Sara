const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    //pasamos el usuario para poder trabajar con él
    const obj = {
        //este objeto es lo que voy a codificar, y colocar dentro de mi json.token
        user_id: user.id,
        //se suele poner una fecha de caducidad del token
        exp: dayjs().add(5, 'days').unix()
        //unics() es el formato
    }
    return jwt.sign(obj, 'clave ultrasecreta')
    //codificamos el obj
}



module.exports = {
    createToken
}
