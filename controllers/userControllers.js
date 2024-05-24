const database = require('../models/User');

exports.readUser = async (req, res) => {
    try {
        console.log("Read user");
        const requestedUser = await database.User.findOne({ 
            where: { id: req.params.id } 
        });
        res.status(200).send(requestedUser);
    } catch(error) {
        console.log("Error", error);
        res.status(500);
    }
}

exports.createUser = async (req, res) => {

    console.log("Create user")
    // database.User.create({
    //     email: req.body.email,
    //     password: req.body.password,
    //     permission: req.body.permission,
    // })
    //     .then(submitedUser => res.send(submitedUser));

    const submitedUser = await database.User.create({
        email: req.body.email,
        password: req.body.password,
        permission: req.body.permission,
    });
    res.send(submitedUser)
    
}



exports.updateUser = async (req, res) => {
    const { email, password, permission } = req.body;
    const updatedUser = await database.User.update({
        ...email        && { email },
        ...password     && { password },
        ...permission   && { permission},
    }, {where: { id }});
    res.send("Dados de usuário atualizados");
}

exports.deleteUser = (req, res) => {
    const deletedUser = database.User.destroy({
        where: { id: req.params.id }
    })
    res.send("Usuário deletado com sucesso")
}