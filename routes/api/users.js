const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/utils');

const { create, getByEmail, getById } = require('../../model/users.model');



//POST /api/usuarios/registro
router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8)

    try {
        const [result] = await create(req.body);
        const [newUser] = await getById(result.insertId);
        res.json(newUser[0]);
    } catch (err) {
        res.json({ Fallo: err.message })
    }
});


router.post('/login', async (req, res) => {
    try {
        //Existe el email en la base de datos?
        const [result] = await getByEmail(req.body.email)
        if (result.length === 0) {
            return res.json({ Fatal: 'error en el email o contraseña' })
        }

        const usuario = result[0];
        // ¿las passwords coinciden?
        //tenemos la password de la base de datos y la password que le paso por el body, comprobamos si coinciden
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (!iguales) {
            return res.json({ Fatal: 'error en el email o contraseña' })
        }


        res.json({
            success: 'login correcto',
            token: createToken(usuario)
        });

    } catch (err) {
        res.json({ fallo: err.message });
    }
})


module.exports = router;