//SCHEMA ONLY
const { Schema, Types } = require('mongoose');
const reactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),//set default value to current stamp
            get: d => d.toLocaleDateString(),//use a getter method to format the timestamp on query
        },
    },
    { 
        toJSON: { getters: true },
        id: false,
    }
);

module.exports = reactionSchema;

//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.