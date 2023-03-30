const router = require('express').Router();
const { getAll } = require('../../model/movies.model')


router.get('/', async (req, res) => {
    try {
        const [movies] = await getAll();
        res.json(movies);
    } catch (err) {
        res.json({ fallo: err.message })
    }


})







module.exports = router;
