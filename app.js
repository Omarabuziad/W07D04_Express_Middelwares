const express = require("express");

const app = express();
const port = 3000;

// pulse check 



//1
const logUsers = (req , res , next)=>{
  console.log(users)
  const err = new Error("No users");
  err.status = 500;
  // pass it to next, we only pass values to `next` when we want to call the error handling middleware
  next(err);
}

//2
app.use(logUsers)


//3
const logMethod = (req , res , next)=>{
    console.log(req.method)
    next()
}

app.use("/users" , logMethod )


//4
app.use(express.json())

//5

app.use((err , req , res , next)=>{
    if(users[0]){
        res.json(users)

    } else {
        res.json(err.message)
    }

})





const users = [];



app.get("/users", (req, res, next) => {
  res.json(users);
  
});












app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


