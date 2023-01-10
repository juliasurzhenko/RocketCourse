const users = require("../../database/users.json");

const userService = require("./user.service");

console.log('lalalala')

const {
    readData,
    writeData,
    checkName,
    findUserByID} = require("./user.service");

module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            const user = await readData();
            res.json(user);
        } catch (e) {
            // res.status(400).send(e.message);
            next(e);

        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body);

            res.status(201).json(createdUser)
            // const createUser = req.body;
            // const users = await readData();
            //
            // await checkName(users, createUser);
            // if (typeof createUser.name !== 'string' || createUser.name.length < 2) {
            //     return res.status(400).send('Incorrect Name');
            // }
            //
            // if (typeof createUser.age !== 'number' || createUser.age < 0) {
            //     return res.status(400).send('Incorrect Age');
            // }
            //
            // const newUser = {
            //     id: users.at(-1) ? users.at(-1).id + 1 : 1,
            //     name: createUser.name,
            //     age: createUser.age,
            // };
            //
            // users.push(newUser);
            // await writeData(users);
            //
            // res.status(201).json(newUser);
        } catch (e) {
            // res.status(400).send(e.message);
            next(e);
        }
    },

    getUserbyId: async (req, res, next) => {
        try {
            console.log(req.user)
            const { userId } = req.params;
            const users = await readData();

            const user = await findUserByID(users, userId);
            res.json(req.user);
        } catch (e) {
            res.status(400).json(e.message);
            next(e);
        }
    },

    updateUser:  async (req, res, next) => {
        try {
            const updateUser = req.body;
            const {userId} = req.params;

            const users = await readData();
            const user = await findUserByID(users, userId);
            await checkName(users, updateUser);

            const index = user.id - 1;
            users[index] = {...users[index], ...updateUser};

            await writeData(users);
            res.send('User updated');
        } catch (e) {
            // res.status(400).json(e.message);
            next(e);

        }
    },


    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const users = await readData();
            const user = await findUserByID(users, userId);
            const index = user.id - 1;

            users.splice(index, 1);  // or filter

            await writeData(users);
            res.status(200).send('User was deleted');
        } catch (e) {
            // res.status(400).send(e.message);
            next(e);

        }
    },
}