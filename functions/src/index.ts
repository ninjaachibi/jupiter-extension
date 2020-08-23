// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
var cors = require('cors');

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

//initialize express server
const app = express();
app.use(cors());

const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use('/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';

app.get('/', (req, res) => {
    console.log('hello world')
    res.send('Hello World!')
})

// get all users
app.get('/authUsers', (req, res) => {
    const maxResults = 1; // optional arg.

    auth.listUsers(maxResults).then((userRecords) => {
        userRecords.users.forEach((user) => console.log(user.toJSON()));
        res.end('Retrieved users list successfully.');
    }).catch((error) => console.log(error));
})

// interface User {
//     firstName: String,
//     lastName: String,
//     email: String,
//     areaNumber: String,
//     department: String,
//     id: String,
//     contactNumber: String
// }

interface RecipeItem {
    productId: String;
    name: String;
    count: Number;
}

interface Recipe {
    creator_uid: String
    recipeName: String;
    ingredientList: Array<RecipeItem>;
}

// create new recipe 
app.post('/recipes', async (req, res) => {

    try {
        const recipe: Recipe = req.body

        console.log(recipe)
        const newRecipe = await db.collection("recipes").add(recipe);
        res.status(201).json(`Created a new recipe: ${newRecipe.id}`);
    } catch (error) {
        res.status(400).json(`Error in creating recipe`)
    }
});

// gets all recipes
app.get('/recipes', async (req, res) => {
    try {
        const { uid } = req.query;
        console.log('uid is', uid)

        const collection = uid ? db.collection("recipes").where("creator_uid", "==", uid) : db.collection("recipes")

        collection.get().then(function (querySnapshot) {
            res.status(200).json(querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        });
    }
    catch (err) {
        res.status(400).json(`Error in getting recipe`)
    }
})

app.delete('/recipes', (req, res) => {
    const { id } = req.query;
    if (id == undefined) {
        res.status(400).json(`recipe id is null`)
    }

    try {
        db.collection("recipes").doc(`${id}`).delete().then(function () {
            console.log("Document successfully deleted!");
            res.status(200).json("doc successfully deleted")
        })
    }
    catch (error) {
        console.error("Error removing document: ", error);
        res.status(400).json(`Error in getting recipe`)
    }
})

//get all users from db
app.get('/users', async (req, res) => {
    try {
        const userQuerySnapshot = await db.collection(userCollection).get();
        const users: any[] = [];
        userQuerySnapshot.forEach(
            (doc) => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//define google cloud function name
export const webApi = functions.https.onRequest(main);