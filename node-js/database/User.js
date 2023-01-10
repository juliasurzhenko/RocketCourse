const {Schema, model} = require('mongoose');
const rolesEnum = require('../configs/roles.enum')

const UserSchema = new Schema({
        firstName: {type: String, trim: true, default: ''},
        lastName: {type: String, default: ''},
        email: {type: String, trim: true, unique: true, lowercase: true, required: true},
        age: {type: Number, default: 0},
        role: {type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER}
    }, {
    timestamps: true,
    versionKey: false,
    }
);

module.exports = model('User', UserSchema)
