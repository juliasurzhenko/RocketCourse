const fs = require("node:fs/promises");
const path = require("node:path");
const users = require("../../database/users");

const dataBasePath = path.join('database', 'users.js')
module.exports = {

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

    findUserByID: async (user, id) => {
        const users = user.find(usr => usr.id === +id);
        if (!user) {
            throw new Error('User not found');
        }
        return users;
    },

    // getSingleUser: (userId) => {
    //     const user = users[userId-1];
    //
    //     if(!user){;
    //         throw new Error('User not found')
    //     }
    //
    //     return user;
    // }
}