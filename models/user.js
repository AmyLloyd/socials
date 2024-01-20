const { Schema, model } = require('mongoose');

//Source https://stackoverflow.com/users/1189620/ramon22
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [
        //Array of _id values referencing the Thought model
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
            },
        ],
        friends: [
        //Array of _id values referencing the User model (self-reference)
            {
            type: Schema.Types.ObjectId,
            ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;