const fs = require("node:fs/promises");
const path = require("node:path");
const dataBasePath = path.join('database', 'users.json');

const users = require("../../database/users.json");
const User = require("../../database/User");

module.exports = {
    createUser: (userObject) => {
        return User.create(userObject)
    },

    readData: async () => {
        const users = await fs.readFile(dataBasePath);
        return JSON.parse(users.toString());
    },

    writeData: async (users) => {
        await fs.writeFile(dataBasePath, JSON.stringify(users));
    },

    checkName: async (dbUser, user) => {
        const doubleName = dbUser.find(u => u.name === user.name);
        if (doubleName) {
            throw new Error('User with this name already exists');
        }
    },

    findUserByID: async (id, users) => {
        console.log(users)
        console.log("----------")
        console.log(id);
        const user = users.find(usr => usr.id === +id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },
}