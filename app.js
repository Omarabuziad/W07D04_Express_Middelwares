const express = require("express");

const app = express();
const port = 3000;
const newRouter = express.Router()

const routerProd = express.Router()



const users = ["John", "Mark"];




// pulse check 
//1 
const logUsers = (req , res , next)=>{
    //ُError if there is no users
    const err = new Error("No users");
    err.status = 500;
    if(users[0]){
      console.log(users);
      res.json(users)
      next()
     } else {
     next(err); }
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





//Practices : 


//1 
newRouter.use("/" , (req, res, next) => {
    console.log(users);
    next()
});



//2 create a New user 
newRouter.post("/create" , ( (req, res, next) => {
    const user = req.body.name
    users.push(user)
    console.log(user);
    res.json(users);
    next()
}))


app.use("/users" , newRouter )









// 3 & 4 & 5
const product = [ "keyboard" , "mouse" ]

app.use("/products" , (req,res,next)=>{
    console.log(routerProd)
    next()
})



routerProd.put("/update/:name" , ( (req, res, next) => {
    const name = req.params.name
    const product1 = req.body.product
    console.log(product1)
    console.log(product)
    let i
    const found = product.find((elem,index)=>{
        i=index
       return  elem == name
    })
    

    if(found){
        product.splice(i , 1 , product1 )
        res.json("product has been updated")
    } else {
        console.log("product not found")
        
    }
    next()

}))

app.use("/products" , routerProd )



app.use( "*" ,  (req,res,next)=>{
    const err = new Error("NOT FOUND");
    err.status = 404;
    next(err)
})




//puls check 5 Error handling middlewares

app.use((err , req , res , next)=>{
    res.status(err.status);

    res.json({
        error: {
          status: err.status,
          message: err.message,
        },
    });

    next()

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


