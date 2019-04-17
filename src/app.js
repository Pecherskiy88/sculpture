const express = require('express');
const app = express();
const port = 3000;

// dependencies
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const router = require('./routes/routes');

// database
const uri= "mongodb+srv://Sculptor:42497330sS@cluster0-vl4ng.mongodb.net/test?retryWrites=true";
mongoose.connect(uri,{useNewUrlParser:true}).then((data)=>console.log("CONNECTED")).catch(err=>console.log(err))

// middleware
app.use(logger('tiny'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors()); 


// routes
app.use('/', express.static('public'));

app.use('/api', router);   

// response
app.get('/', (req,res)=>{
    res.send('WORK')
});


app.listen(port, ()=>console.log('SERVER START AT PORT', port));