/* eslint-disable */
import firebase from 'firebase'



var db;
var importList;

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

export function addAnswer(newAns){
  return db.collection("answers").add(newAns);
}

export function listen(nodeList1,nodeList2){
    var node;
    db.collection("answers").onSnapshot(snapshot => {
        snapshot.docChanges().forEach( change => {
            if (change.type === "added") {
                //console.log("New: ", change.doc.data());
                node= change.doc.data();
                if(node.ans == 1){
                    nodeList1.push({
                        id: nodeList1.length+1,
                        _color: '#6ec6ff',
                    });
                }else{
                    nodeList2.push({
                        id: nodeList2.length+1,
                        _color: '#64ffda',
                    });
                }
            }
            if (change.type === "modified") {
                console.log("Modified: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed: ", change.doc.data());
            }

        });
        
        console.log(importList);
        
    });
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

export var db;

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