//Methods Library - MOVIES

const getAll = () => {
    return db.query('SELECT * FROM harry_potter.movies');
}


const create = ({ title, year, image }) => {
    return db.query(`INSERT INTO harry_potter.movies
    (title,
    year,
    image)
    VALUES
    (?,?,?)`,
        [title, year, image]);
}

const getMovieById = (movieId) => {
    return db.query('select * from movies where id = ?', [movieId]);
}


const deleteById = (movieId) => {
    return db.query('delete from harry_potter.movies where id = ?', [movieId]);
}



module.exports = { getAll, create, deleteById, getMovieById };