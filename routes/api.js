const router = require('express').Router();


router.use('/movies', require('./api/movies'));



module.exports = router;
