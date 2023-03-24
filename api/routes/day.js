const Day=require("../models/Day")
const router = require("express").Router();

// insert into db
router.post("/insertDay", async (req,res)=>{ 
  
    try{
       
        // create new day
        const newDay = new Day({
            username: req.body.username,
            color: req.body.color,
            vibes: req.body.vibes,
            journal: req.body.journal,
        });
        
                const day = await newDay.save();
                return res.status(200).json(day); // send success (200)
           
        
    }catch(err){
        //console.log(err);
        return res.status(500).json(err);
    }
   
})


router.post("/addCompletedHabits", async (req, res) => {
      try {
                const newDay = new Day({
                    username: req.body.username,
                    completedHabits: req.body.completedHabits,
                });
                
                const day = await newDay.save();
                return res.status(200).json(day); // send success (200)
        
      } catch (err) {
        return res.status(500).json(err);
      }
   
  });

  router.get("/getCompletedHabits/:username", async (req, res) => {
	try {
		//const user = await User.findOne({ username: req.params.username });
		const habitsDays = await Day.find({ username: req.params.username });
		res.status(200).json(habitsDays);
	} catch (err) {
		res.status(500).json("error fetching completed habits");
	}
});

  

 module.exports = router