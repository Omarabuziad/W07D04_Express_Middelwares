const express = require("express");

const app = express();
const port = 3000;
const newRouter = express.Router()
// pulse check 








//1
const logUsers = (req , res , next)=>{
  console.log(users)
  next()
  
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
    res.json({
        error: {
          status: err.status,
          message: err.message,
        },
    });

    next()

})





const users = ["John", "Mark"];






newRouter.get("/" , (req, res, next) => {
  const err = new Error("No users");
  err.status = 500;
  // pass it to next, we only pass values to `next` when we want to call the error handling middleware
  if(users[0]){
    console.log(users);
    next()

  } else {
  next(err); }
  
  
});

newRouter.post("/create" , ( (req, res, next) => {
    const user = req.body.name
    users.push(user)
    console.log(user);
    res.json(users);
    next()
}))


app.use("/users" , newRouter )













app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


