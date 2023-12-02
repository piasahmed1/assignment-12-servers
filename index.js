const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 4000;
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIVE_SECRET_KEY);



//middleware
app.use(cors());
app.use(express.json());
// app.use(cookieParser())

//
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://hostel-management-7f6f8.web.app'
  ],

  credentials: true




}))







app.get('/', (req, res) => {
  res.send('order the meals');
})


app.listen(port, () => {
  console.log(`order the meals on port ${port}`);
})
//5v0T431F7TK6KliI
//Hostel-management


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.gjcm0gd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const userscollection = client.db('HostelManagement').collection('users')
    const mealscollection = client.db('HostelManagement').collection('allmeals')
    const cartscollection = client.db('HostelManagement').collection('carts')
    const membershipcollection = client.db('HostelManagement').collection('membership')
    const paymentcollection = client.db('HostelManagement').collection('payments')
    const upcommingcollection = client.db('HostelManagement').collection('upcomming')
    const reviewcollection = client.db('HostelManagement').collection('review')




    app.get('/review', async (req, res) => {
      const result = await reviewcollection.find().toArray();
      res.send(result)
    })

    app.post('/review', async (req, res) => {

      const item = req.body;
      const result = await reviewcollection.insertOne(item);
      res.send(result);
    })




    app.post('/upcomming', async (req, res) => {

      const item = req.body;
      const result = await upcommingcollection.insertOne(item);
      res.send(result);
    })



    app.get('/upcomming', async (req, res) => {
      const result = await upcommingcollection.find().toArray();
      res.send(result)
    })

    app.get('/upcomming/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await upcommingcollection.findOne(query)
      res.send(result)

    })

    app.delete("/upcomming/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await upcommingcollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });



    app.get('/allmeals', async (req, res) => {
      const result = await mealscollection.find().toArray();
      res.send(result)
    })


    //one card clicked and go that card details then....
    app.get('/allmeals/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await mealscollection.findOne(query)
      res.send(result)

    })

    //all melas route
    app.delete("/allmeals/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await mealscollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    //add meals
    app.post('/allmeals', async (req, res) => {

      const item = req.body;
      const result = await mealscollection.insertOne(item);
      res.send(result);
    })


    //update meals route

    app.patch('/allmeals/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          name: item.name,
          category: item.category,
          price: item.price,
          Rating: item.Rating,
          Date: item.Date,
          Likes: Likes.image,
          distributorName: distributorName.image,
          distributorEmail: itdistributorEmailem.image,
          Ingredients: Ingredients.image,
          Description: Description.image
        }
      }

      const result = await mealscollection.updateOne(filter, updatedDoc)
      res.send(result);
    })



    //membership

    app.get('/membership', async (req, res) => {
      const result = await membershipcollection.find().toArray();
      res.send(result)
    })

    app.get('/membership/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await membershipcollection.findOne(query)
      res.send(result)

    })



    app.post('/carts', async (req, res) => {
      const cartItem = req.body;

      const result = await cartscollection.insertOne(cartItem);
      res.send(result);
    })

    app.get('/carts', async (req, res) => {


      //email onujayi
      const email = req.query.email;
      const query = { email: email }

      const result = await cartscollection.find(query).toArray();

      res.send(result)
    })






    //delete


    app.delete('/carts/:id', async (req, res) => {

      const id = req.params.id;
      const query = { _id: new ObjectId(id) }

      const result = await cartscollection.deleteOne(query)
      res.send(result)
    })



    //jwt token

    app.post('/jwt', async (req, res) => {

      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECURE, {
        expiresIn: '1h'
      })

      res.send({ token })

    })

    //middlewares

    // const verifyToken = (req, res, next) => {
    //   // console.log(req.headers.authorization);
    //   if (!req.headers.authorization) {
    //     return res.status(401).send({ message: 'unauthorised access' });
    //   }

    //   const token = req.headers.authorization.split(' ')[1];
    //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //       return res.status(401).send({ message: 'unauthorised access' })
    //     }
    //     req.decoded = decoded;
    //     next();
    //   })

    // }



    //use verify admin after verifytoken
    //  const verifyAdmin = async (req, res, next) => {

    //   const email = req.decoded.email;
    //   const query = { email: email };
    //   const user = await userscollection.findOne(query);
    //   const isAdmin = user?.role === 'admin';
    //   if (!isAdmin) {
    //     return res.status(403).send({ message: 'forbidden access' })
    //   }
    //   next();
    // }





    //user releted api

    app.get('/users', async (req, res) => {
      console.log(req.headers);
      const result = await userscollection.find().toArray();
      res.send(result)
    })



    //is admin?
    app.get('/users/admin/:email', async (req, res) => {

      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" })
      }
      const query = { email: email };
      const user = await userscollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user.role == 'admin';
      }
      res.send({ admin })
    })









    //all user

    app.post('/users', async (req, res) => {
      const user = req.body;


      //insert email if user doesnot exists:
      // you can do this many ways(1.email unique,2.upsert,3.simple checking)

      const query = { email: user.email }

      const exixtinguser = await userscollection.findOne(query);

      if (exixtinguser) {
        return res.send({ message: 'user already exixtis', insertedId: null })
      }

      const result = await userscollection.insertOne(user);
      res.send(result);

    })






    //admin panel delete

    app.delete('/users/:id', async (req, res) => {

      const id = req.params.id;
      const query = { _id: new ObjectId(id) }

      const result = await userscollection.deleteOne(query)
      res.send(result)
    })

    //admin panel admin setup


    app.patch('/users/admin/:id', async (req, res) => {


      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userscollection.updateOne(filter, updateedDoc);
      res.send(result)
    })







    //payment
    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount insite the intern');


      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card'],

      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      })

    })


    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentcollection.insertOne(payment)
      //carefully delete each item fron the cart
      console.log("payment info", payment);

      const query = {
        _id: {
          $in: payment.cardId.map(id => new ObjectId(id))
        }
      }

      const deleteResult = await mealscollection.deleteMany(query)
      res.send({ paymentResult }, deleteResult)





    })









    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
