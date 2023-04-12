const router = require('express').Router();
const { checkToken } = require('../../helpers/middlewares');
const { getAll, create, deleteById, getMovieById } = require('../../model/movies.model')


router.get('/', checkToken, async (req, res) => {
    try {
        const [movies] = await getAll();
        res.json(movies);
    } catch (err) {
        res.json({ fallo: err.message })
    }
});


router.get('/:movieId', async (req, res) => {
    const { movieId } = req.params;
    try {
        const [movie] = await getMovieById(movieId);
        res.json(movie[0]);
    } catch (err) {
        res.json({ fallo: err.message })
    }
})



router.post('/newMovie', async (req, res) => {
    try {
        const [newMovie] = await create(req.body);
        const [movie] = await getMovieById(newMovie.insertId);
        res.json(movie[0]);
    } catch (err) {
        res.json({ fallo: err.message })
    }
});


router.delete('/:movieId', async (req, res) => {
    const { movieId } = req.params;
    try {
        const [movie] = await getMovieById(movieId);
        if (movie.length === 0) {
            return res.json({ fallo: 'It doesnt exist a movie with this ID' });
        }
        const [result] = await deleteById(movieId);
        res.json(movie[0]);
    } catch (err) {
        res.json({ fallo: err.message })
    }
});







module.exports = router;
