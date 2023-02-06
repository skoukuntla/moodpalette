const router = require("express").Router()
const User = require("../models/User")

// Register --> http://localhost:8800/api/auth/register
router.get("/register", async (req,res)=>{   // he also has a video on what async and await functions are
    
    // test user
    const user = await new User({
        username:"venkat82",
        email: "venkat82@purdue.edu",
        password: "pass"
    })


    await user.save() // this is mongodb command to insert into db
    res.send("ok")
 })

 module.exports = router

