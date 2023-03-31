//Methods Library - MOVIES

const getAll = () => {
    return db.query('SELECT * FROM harry_potter.movies');
}

module.exports = { getAll };