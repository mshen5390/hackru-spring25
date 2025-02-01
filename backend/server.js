
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ms3738:<hackru25>@igdbcluster.5jd2g.mongodb.net/?retryWrites=true&w=majority&appName=IGDBcluster";

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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
//https://api.igdb.com/v4/games
//POST: https://api.igdb.com/v4/games
// Client-ID: w04e1kn7gryz795m71gpy714k4b9l6
// Authorization: Bearer viymhz5qr9ayawuxg8i2ugks46cqfy
// Body: "fields *;"

// {
//     "access_token": "ooodv0xdwayh2ksvmq0pf23mg91hse",
//     "expires_in": 5501568,
//     "token_type": "bearer"
// }

//https://id.twitch.tv/oauth2/token?client_id=w04e1kn7gryz795m71gpy714k4b9l6&client_secret=viymhz5qr9ayawuxg8i2ugks46cqfy&grant_type=client_credentials

//json file wiht all the data from the database then upload that to mongo
//  wiht a python script that uploads with it