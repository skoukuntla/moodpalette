const router = require("express").Router()
const { restart } = require("nodemon");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register --> http://localhost:8800/api/auth/register
/* BELOW IS A SAMPLE USER FOR REGISTRATION*/
// router.get("/register", async (req,res)=>{   // lamadev also has a video on what async and await functions are
    
//     // test user
//     const user = await new User({
//         username:"verma108",
//         email: "verma108@purdue.edu",
//         password: "pass",
//         age: 20
//     })


//     await user.save() // this is mongodb command to insert into db
//     res.send("ok")
//  })

//Register
router.post("/register", async (req, res) => {

    try {
        //encrypting the password that user entered
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User ({ //req is what we are sending to the method
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age
        }); 

        //save user and respond
        const user = await newUser.save(); //insert into database
        res.status(200).json(user) //if it inserts successfully, the server will return an OK 200 message and the object that was added to DB
    } catch(err) {
        res.status(500).json(err);
    }
});

//LOGIN --> http://localhost:8800/api/auth/login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username}); //finding the user with this username in the database
        !user && res.status(404).send("user not found!") //if the user is not found, send a 404 message

        const validPassword = await bcrypt.compare(req.body.password, user.password) //comparing password typed vs encrypted password
        !validPassword && res.status(404).send("passwords do not match!") //send an error if the passwords do not match

        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err);
    }

}) 

 module.exports = router

