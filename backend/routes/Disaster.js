const express = require('express')
const router = require('router')
const Disaster = require('../models/disaster')


router.post('/createDisaster',(req,res)=>{
    try{
        const {latitude,longitude,alertName,alertSeverity,createdBy} =  req.body;
        const newDisaster = new Disaster({
            latitude,
            longitude,
            alertName,
            alertSeverity,
            createdBy
        }) 
    
        await newDisaster.save()
        res.status(201).json({message : "disaster created successfully"})
    }
    catch (error) {
        // Handle errors and respond with an error message
        console.error("Error registering disaster", disaster);
        res.status(500).json({ message: "disaster creation failed" });
      }
   
})
