const router = require('express').Router();
const { getAll, create, getCharacterById, updateById, deleteById } = require('../../model/characters.model')


router.get('/', async (req, res) => {
    try {
        const [characters] = await getAll();
        res.json(characters);
    } catch (err) {
        res.json({ fallo: err.message })
    }


})

router.get('/:characterId', async (req, res) => {
    const { characterId } = req.params;
    try {
        const [character] = await getCharacterById(characterId);
        res.json(character[0]);
    } catch (err) {
        res.json({ fallo: err.message })
    }
})



router.post('/newCharacter', async (req, res) => {
    try {
        const [newCharacter] = await create(req.body);
        const [character] = await getCharacterById(newCharacter.insertId);
        res.json(character[0]);
    } catch (err) {
        res.json({ fallo: err.message })
    }
});

//PUT
router.put('/:characterId', async (req, res) => {
    const { characterId } = req.params;
    try {
        await updateById(characterId, req.body)
        const [updatedCharacter] = await getCharacterById(characterId)
        res.json(updatedCharacter[0]);
    } catch (err) {
        res.json({ fatal: err.message })
    }
})


router.delete('/:characterId', async (req, res) => {
    const { characterId } = req.params;
    try {
        const [character] = await getCharacterById(characterId);
        if (character.length === 0) {
            return res.json({ fallo: 'It doesnt exist a character with this ID' });
        }
        const [result] = await deleteById(characterId);
        res.json(character[0]);
    } catch (err) {
        res.json({ fallo: err.message })
    }
});






module.exports = router;