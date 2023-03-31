const router = require('express').Router();
const { getAll } = require('../../model/characters.model')


router.get('/', async (req, res) => {
    try {
        const [characters] = await getAll();
        res.json(characters);
    } catch (err) {
        res.json({ fallo: err.message })
    }


})







module.exports = router;