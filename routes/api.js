const router = require('express').Router();


router.use('/movies', require('./api/movies'));
router.use('/characters', require('./api/characters'));
router.use('/users', require('./api/users'));



module.exports = router;
