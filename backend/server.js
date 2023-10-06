const express = require('express')
const axios = require('axios');
const app = express()
const PORT = process.env.PORT || 3001


// middlewares
// app.use(cors());
app.use(express.json());



const db = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.mongoDB_URL)
        console.log(`connected successfully ${connect.connection.host}` )
    }
    catch(error){
        console.log(`error is ${error}`)
    }
  }



app.get('/' ,(req, res) => {
    res.send('Hello from the backend!');
});



//Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // db();
  });