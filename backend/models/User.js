const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Поле username обязательно для заполнения'],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await User.findOne({username: value});
                if(user) return false;
            },
            message: "Такой пользователь уже существует"
        }
    },
    password: {
        type: String,
        required: [true, 'Поле password обязательно для заполнения']
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    token: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: [true, 'Поле "Имя" обязательно для заполнения']
    },
    avatar: {
        type: String,
        default: null
    },
    facebookId: String
});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, opt) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPass = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.genToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;