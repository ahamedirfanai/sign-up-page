const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/newdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error: " + err);
  });

  app.post("/login",(req,res)=>{
     const {email,password}= req.body;
     UserModel.findOne({email:email})
     .then(user=>{
      if(user){
       if(user.password ===password){
        res.json("success")
       }
       else{
        res.json("the password is incorrect")
       }
     }
     else{
      res.json("no record existed")
     }
     
   } )

  })

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
