const { updateOne } = require("../models/Day");
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
        return res.status(200).json(day); //send success (200)
           
        
    }catch(err){
        //console.log(err);
        console.log("oh shit!");
        return res.status(500).json(err);
    }
   
})

router.post("/deleteHabit", async (req, res) => {
  try {
    const currentDay = await Day.findOne({ username: req.body.username, date: req.body.date, vibe: { $exists: false }}); // yourself
    await currentDay.updateOne({ $pull: { completedHabits: req.body.habit, allHabits: req.body.habit} }); // remove from your completedHabits array
    return res.status(200).json("Habit has been deleted!");
  } catch (err) {
    return res.status(500).json(err);
  }
});


router.get("/getDailyData/:username/:date", async (req, res)=>{
    try {
		//const user = await User.findOne({ username: req.params.username });
		const day = await Day.find({ username: req.params.username, date: req.params.date });
		res.status(200).json(day);
	} catch (err) {
		res.status(500).json("error fetching completed habits");
	}
})

router.get("/getChecklist/:username/:date", async (req, res)=>{
  try {
  //const user = await User.findOne({ username: req.params.username });
  const day = await Day.find({ username: req.params.username, date: req.params.date, vibe: { $exists: false }  });
  res.status(200).json(day);
} catch (err) {
  res.status(404).json("not found");
}
})

router.put("/getDailyData/:username/:date/:id", async (req, res)=>{
    try {
		const day = await Day.find({ username: req.params.username, date: req.params.date });
        console.log(day)
        await day.updatOne({url: req.params.url})
		res.status(200).json(day);
	} catch (err) {
		res.status(500).json("err");
	}
})



router.post("/addCompletedHabits", async (req, res) => {
      try {
                const newDay = new Day({
                    username: req.body.username,
                    completedHabits: req.body.completedHabits,
                    allHabits: req.body.allHabits,
                    date: req.body.date,
                });
                
                const day = await newDay.save();
                return res.status(200).json(day); // send success (200)
        
      } catch (err) {
        return res.status(500).json(err);
      }
   
  });

  router.delete("/deleteUpdateHack/:username/:date", async (req, res) => { //delete day object with completedHabits
    try {
      const day = await Day.findOneAndDelete({username: req.params.username, date: req.params.date, vibe: { $exists: false }});
      res.status(200).json("Day has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  });


  router.get("/getCompletedHabits/:username/:date", async (req, res) => {
	try {
		//const user = await User.findOne({ username: req.params.username });
		const habitsDays = await Day.find({username: req.params.username, date: req.params.date, vibe: { $exists: false }});
		res.status(200).json(habitsDays);
	} catch (err) {
		res.status(500).json("error fetching completed habits");
	}
});

router.put("/updateCompletedHabits/:username", async (req, res) => {

        try {
          /*const day = await Day.find({username: req.body.username}, {
            $set: req.body.completedHabits,
          });*/

          const day = await Day.find({username: req.params.username})
          console.log(day)
          await day.updateOne({ $set: req.body });
        
          res.status(200).json("habits have been updated");
        } catch (err) {
          return res.status(500).json(err);
        }
      
    });

    router.post("/addPlaylistID", async (req, res) => {
      try {
                console.log("PLAYLIST PUSH TO DB");
                const newDay = new Day({
                    username: req.body.username,
                    playlistId: req.body.playlistId,
                });
                
                const day = await newDay.save();
                return res.status(200).json(day); // send success (200)
        
      } catch (err) {
        return res.status(500).json(err);
      }
   
  });


  

 module.exports = router