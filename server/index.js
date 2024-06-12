const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const mongoURI = 'mongodb+srv://crazyvamsi61:crazyvamsi61@cluster0.fmc67ef.mongodb.net/mealhelp'

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User',UserSchema);

const app = express();
app.use(cors());
app.use(express.json());


//register
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User ({ username, email, password });
        await newUser.save();
        
        res.send('User registered successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.get("/register", (req, res) => {
    res.render("Register.html");
  });


//login
app.post('/login', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const foundUser = await User.findOne({ username:username });

        if(!foundUser){
            console.log('username',username);
            return res.status(401).send('Invalid username or password');
        }

        if(password !== foundUser.password){
            console.log('password',password);
            return res.status(401).send('Invalid username or password');
        }

        console.log('successful');
        return res.send('Login successful!');
    }catch(err){
        console.error(err);
        return res.status(500).send('Server Error')
    }
});

app.get("/login", (req, res) => {
    res.render("Login.html");
  });
const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));