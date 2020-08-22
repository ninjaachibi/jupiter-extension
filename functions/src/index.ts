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

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';

app.get('/', (req, res) => {
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

interface User {
    firstName: String,
    lastName: String,
    email: String,
    areaNumber: String,
    department: String,
    id: String,
    contactNumber: String
}

// create new recipe 
// Create new user
app.post('/recipes', async (req, res) => {
    try {
        const user: User = {
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            email: req.body['email'],
            areaNumber: req.body['areaNumber'],
            department: req.body['department'],
            id: req.body['id'],
            contactNumber: req.body['contactNumber']
        }

        const newDoc = await db.collection(userCollection).add(user);
        res.status(201).send(`Created a new user: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`User should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
    }
});

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