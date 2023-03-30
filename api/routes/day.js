const Day=require("../models/Day")
const router = require("express").Router();

// insert into db
//post request route defined for the path "/inserDay"
router.post("/addDayInputs", async (req,res)=>{ 
    console.log("hello there")
    req.setTimeout(60 * 1000); //attempt to manually delay the timeout
    try{
        console.log("hi");
        // create new day
        const newDay = new Day({
            username: req.body.username,
            date: req.body.date,
            color: req.body.color,
            vibe: req.body.vibe,
            journal: req.body.journal,
            emotion: req.body.emotion,
        });
        console.log(newDay);
        const day = await newDay.save();
        return res.status(200).json(day); // send success (200)
           
        
    }catch(err){
        //console.log(err);
        console.log("oh shit!");
        return res.status(500).json(err);
    }
   
})



 module.exports = router