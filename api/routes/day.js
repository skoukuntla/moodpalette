const Day=require("../models/Day")
const router = require("express").Router();

// insert into db
//post request route defined for the path "/inserDay"
router.post("/insertDay", async (req,res)=>{ 
  
    try{
       
        // create new day
        const newDay = new Day({
            username: req.body.username,
            date: req.body.date,
            color: req.body.color,
            vibes: req.body.vibe,
            journal: req.body.journal,
            emotion: req.body.emotion,
        });
        
                const day = await newDay.save();
                return res.status(200).json(day); // send success (200)
           
        
    }catch(err){
        //console.log(err);
        return res.status(500).json(err);
    }
   
})


  

  

 module.exports = router