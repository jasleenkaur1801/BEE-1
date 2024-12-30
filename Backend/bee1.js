/*const express = require('express');
const cors=require('cors');
const app = express();
const port = 3001;
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.status(200).send("Home Page...");
})

app.get("/about",(req,res)=>{
    res.send("About Page...");
})

const users = [];
app.post('/register_user',(req,res)=>{
    let user_id;
    if(users.length===0){
        user_id=1;
    }else{
        user_id=users[users.length-1].id+1;
    }
    const new_user = {
        id: user_id,
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone
    }
    users.push(new_user);
    console.log(users);
    res.status(201).json({message: "User registered..."});
})

app.listen(port,()=>{
    console.log("Server Running....");
})
    */

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the Frontend directory
app.use(express.static(path.join(__dirname, '../Frontend')));

// Route to serve front.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/Front.html'));
});

// Keep your existing user registration route
const users = [];
app.post('/register_user', (req, res) => {
    let user_id;
    if(users.length === 0){
        user_id = 1;
    } else {
        user_id = users[users.length-1].id + 1;
    }
    const new_user = {
        id: user_id,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }
    users.push(new_user);
    console.log(users);
    res.status(201).json({message: "User registered..."});
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});