const { Thought, User, Reaction } = require('../models');

module.exports = {
    //Get all thoughts
    async getThoughts( req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions')
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId })
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thought);        
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            

            await User.findOneAndUpdate(
            { username: req.body.username } ,
            { $push: { thoughts: thought._id } },
            { new: true }
            );
            res.json(thought);

        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //Delete a thought
    async deleteThought(req, res) {
      try {
            const thought = await Thought.findOneAndDelete({
                 _id: req.params.thoughtId 
            });

            if(!thought) {
                res.status(404).json({ message: 'No thought with that id'});
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            
            if(!user) {
                return res.status(404). json({
                    message: "Thought deleted, but no user found",
                });
            }
            res.json({ message: 'Thought and reactions deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!thought) {
                res.status(404).json({ message: 'No thought with that Id' });
                return
            }

            await User.findOneAndUpdate(
                { username: req.body.username } ,
                { $push: { thoughts: thought._id } },
                { new: true }
                );
            
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);        
        }
    },
       async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                {$addToSet: { reactions: req.body } },
                { new: true }

            )
            if(!reaction) {
                res.status(404).json("No thought with this id")
                return
            }
            res.status(200).json(reaction);


        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId} }},
                {new: true }
            )

            if(!reaction) {
                res.status(404).json({ message: 'No thought with this id'});
                return
            }
            res.status(200).json({ message: 'reaction deleted'});
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};