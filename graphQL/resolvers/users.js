const User = require('../../Models/User');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const {validateRegisterInput, validateLoginInputs} = require('../../utils/validators')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(parent, { username, password }) {
            const { errors, valid } = validateLoginInputs(username, password);

            if (!valid) {
                throw new UserInputError('Error', { errors });
            }
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found.';
                throw new UserInputError('User not found.', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials.';
                throw new UserInputError('Wrong credentials.', { errors });
            }
            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(parent, {registerInput: {username, email, password, confirmPassword}}) {
            //validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            //make sure user doesnt already exist

            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken.'
                    }
                })
            }
            //hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const result = await newUser.save();

            const token = generateToken(result)
            return {
                ...result._doc,
                id: result._id,
                token
            }
        }
    }
}