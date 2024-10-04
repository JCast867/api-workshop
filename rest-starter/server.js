const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let db = [];

app.get('/users', (req, res)=>{
    res.json(db);
});

app.get('/', (req, res)=>{
    res.send("hello, world!");
});

app.post('/users', (req, res)=>{
    const {username, password} = req.body;
    const newUser = {
        id: db.length + 1,
        username: username,
        password: password
    }
    db.push(newUser);
    res.status(201).json(newUser);
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
