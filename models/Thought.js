const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thought: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            get: d => d.toLocaleDateString(),          
        },
        //username (The user that created this thought) this.
        username: {
            type: String,
            required: true,
        },
        //these are like replies
        reactions: [reactionSchema]
        //arrays of nested documents created with the reactionSchema
//Schema settings Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

const Thought = model('thought', thoughtSchema);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
    return this.reactions.length;
});
//See https://mongoosejs.com/docs/tutorials/getters-setters.html regarding testing getter in Date


module.exports = Thought;






