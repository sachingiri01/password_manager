
const express = require('express');

const app = express();
const dotenv=require('dotenv')
dotenv.config();
const cors = require('cors')

app.use(cors())
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


const dbName = 'pass_manager';
const bodyparser=require('body-parser')
app.use(bodyparser.json())

app.get('/', async(req, res) => { 
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
   
}) 


app.post('/', async(req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({sucess:true});
   
}) 

// delelte the password
app.delete('/', async(req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({sucess:true});
   
}) 


const PORT = process.env.PORT ||5000;

app.listen(PORT,console.log(
  `Server started on port http://localhost:${PORT}`));