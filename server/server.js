const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/auth')
mongoose.connect('mongodb+srv://tayoblack77:tayoBlack77!@cluster0.7bevp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://localhost:27017/auth')

const {User} = require('./models/user');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const {auth} = require('./middleware/auth')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.post('/api/user',(req,res)=>{

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err,doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(doc)
    })
})

app.post('/api/user/login',(req,res)=>{

        User.findOne({'email':req.body.email},(err,user)=>{
            if(!user) res.json({message: 'Auth failed, user not found'})
            
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err) return err;
                if(!isMatch) return res.status(400).json({
                    message:"Wrong password"
                });
                // res.status(200).send(isMatch)
            // bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
            //         if(err) throw err;
            //         res.status(200).send(isMatch)
            // })
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).send('ok')
            })
        
            })
        }) 
});

app.get('/user/profile',auth,(req,res)=>{
    res.status(200).send(req.token)
 
    
    // res.status(200).send('ok')

})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})