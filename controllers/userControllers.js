const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Get a user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ 
                _id: req.params.userId })
                .populate('thoughts');
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
            
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Add a friend
    //findby friend_id (userId), if not found create user
    //update user_id  
    //Endpoit is put - update :userId/friends/:friendId
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: { friend_id: req.params.friendId } },
                { new: true }
            )
            if(!user) {
                res.status(404).json({ message: 'No user with this id' });
            }
            if(!friendId) {
                res.status(404). json( { message: 'Must include a valid friend Id'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { friends: req.params.userId },
                { $pull: { students: req.params.userId } },
                { new: true }
            )

            if(!user) {
                res.status(404).json({ message: 'No user found with that id' });
            }
            res.status.json({ message: 'Friend successfully deleted' });
        } catch {
            console.log(err);
            res.status(500).json(err);
        }
    }

};