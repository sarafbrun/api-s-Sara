//Methods Library - CHARACTERS

const getAll = () => {
    return db.query('SELECT * FROM harry_potter.characters');
}

const create = ({ name, type, image, status }) => {
    return db.query(`INSERT INTO harry_potter.characters
    (name,
    type,
    image,
    status)
    VALUES
    (?,?,?,?)`,
        [name, type, image, status]);
}

const getCharacterById = (characterId) => {
    return db.query('select * from characters where id = ?', [characterId]);
}


const updateById = (characterId, { name, type, image, status }) => {
    return db.query(
        `update characters set name = ?, 
        type = ?,
        image = ?,
        status = ?
        where id = ?`,
        [name, type, image, status, characterId]
    )
}


const deleteById = (characterId) => {
    return db.query('delete from harry_potter.characters where id = ?', [characterId]);
}




module.exports = { getAll, create, getCharacterById, updateById, deleteById };