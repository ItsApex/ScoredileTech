const express = require('express')
const router = express.Router();
const Disaster = require('../models/disaster')
const axios =  require('axios')

router.post('/createDisaster',async(req,res)=>{
    try{
        const {latitude,longitude,alertName,alertDescription,alertSeverity} =  req.body;
        const newDisaster = new Disaster({
            latitude,
            longitude,
            alertName,
            alertDescription,
            alertSeverity,
  
        }) 
    
        await newDisaster.save()
// sending the message to the users 
// uncomment this line during presentation
        await axios.post('http://localhost:3001/users/sendmessage', {
             'message' : alertName
            });

        res.status(201).json({message : "disaster created successfully"})
    }
    catch (error) {
        // Handle errors and respond with an error message
        console.error("Error registering disaster",error);
        res.status(500).json({ message: "disaster creation failed" });
      }
   
})


router.get("/getalldisasters", async (req, res) => {
    try {
      // Use the find method to retrieve all disasters from the database
      const disasters = await Disaster.find();
  
      // Respond with the list of disasters
      res.status(200).json(disasters);
    } catch (error) {
      console.error("Error fetching disasters:", error);
      res.status(500).json({ error: "Failed to fetch disasters" });
    }
  });




module.exports = router


