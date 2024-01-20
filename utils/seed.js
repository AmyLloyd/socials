const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
    //Delete the collections if they exist
    let userCheck = await connection.db
        .listCollections({ name: "users" })
        .toArray();
    if (userCheck.length) {
        await connection.dropCollection("users");
    }

    let thoughtCheck = await connection.db
        .listCollections({ name: "thoughts" })
        .toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection("thoughts");
    }

    //Create empty array to hold the thoughts
    const thought = [];

    //Loop 20 times -- add thoughts to the thoughts array
    
})