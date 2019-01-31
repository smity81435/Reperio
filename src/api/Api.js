/* eslint-disable */
import firebase from 'firebase'

var db;

export function initialize() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDe6CHe3JQh4rvDDPJzRw02Hv34fSa4wsY",
        authDomain: "reperio-1b8d9.firebaseapp.com",
        databaseURL: "https://reperio-1b8d9.firebaseio.com",
        projectId: "reperio-1b8d9",
        storageBucket: "reperio-1b8d9.appspot.com",
        messagingSenderId: "299309201131"
      };
      firebase.initializeApp(config);
    db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true,
    });
}

//esstential for reperio
//push the user answer to the database
export function addAnswer(newAns){
  return db.collection("answers").add(newAns);
}


//Gets the Decks collection
export function getDecks() {
    return db.collection("decks").get();
}

//gets all the cards for a specified deck
export function getCards(deckId) {
    return db.collection("cards").where("parentId", "==", deckId)
        .get();
}

// exports.updateUser = functions.firestore
//     .document('users/{userId}')
//     .onUpdate((change, context) => {
//       // Get an object representing the document
//       // e.g. {'name': 'Marie', 'age': 66}
//       const newValue = change.after.data();

//       // ...or the previous value before this update
//       const previousValue = change.before.data();

//       // access a particular field as you would any JS property
//       const name = newValue.name;

//       // perform desired operations ...
//     });