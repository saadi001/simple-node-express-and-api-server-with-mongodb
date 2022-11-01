const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json())

/* 
id: dbuser1
password: PaC4EOO2LN8tG5g5
*/

// mongodb code
const uri = "mongodb+srv://dbuser1:PaC4EOO2LN8tG5g5@cluster0.biy4zxs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){

     try{
          const userCollection = client.db('simpleNode').collection('users');
          // const user = {name: 'saadi vai', email: 'saadivai@gmail.com'}
          // retrieve from database
          app.get('/users',async (req, res) =>{
               const cursor = userCollection.find({});
               const users = await cursor.toArray();
               res.send(users);

          })

          // post to database 
          app.post('/users',async (req, res) =>{
               console.log('post api called')
               const user = req.body;               
               const result = await userCollection.insertOne(user);
               user._id = result.insertedId;
               console.log(result)
               res.send(user)
          })
     }
     finally{

     }
}
run().catch((err)=> console.error(err))


const users = [
     {id: 1, name:'saadi', email: 'saadi@gmail.com'},
     {id: 2, name:'nahid', email: 'nahid@gmail.com'},
     {id: 3, name:'joy', email: 'joy@gmail.com'}
]

// app.get('/users', (req, res) =>{
//      res.send(users);
// })

// app.post('/users', (req, res) =>{
//      console.log('post api called')
//      const user = req.body;
//      user.id = users.length + 1;
//      users.push(user);
//      console.log(user)
//      res.send(user)
// })

app.get('/', (req, res) =>{
     res.send('server is running')
});

app.listen(port, ()=>{
     console.log(`simple node server running on port ${port}`)
})