const router = require('express').Router();


router.use('/movies', require('./api/movies'));
router.use('/characters', require('./api/characters'));



module.exports = router;
