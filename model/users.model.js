//Libreria de acciones de users

const create = ({ username, email, password }) => {
    return db.query('insert into users (username, email, password) values (?,?,?)', [username, email, password]);
}

//select * from users where email = ?;
const getByEmail = (email) => {
    return db.query('select * from users where email = ?', [email]);
}

const getById = (usuarioId) => {
    return db.query('select * from users where id = ?', [usuarioId]);
}

module.exports = { create, getByEmail, getById };