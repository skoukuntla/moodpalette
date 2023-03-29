const Day=require("../models/Day")
const router = require("express").Router();

// insert into db
//post request route defined for the path "/inserDay"
router.post("/insertDay", async (req,res)=>{ 
    res.socket.setTimeout(10000);
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
        return res.status(500).json(err);
    }
   
})


  

  

 module.exports = router