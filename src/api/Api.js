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
  return db.collection("emotions").add(newAns);
}
export function changeViz(selection){
    db.collection("dataview").doc("viz").set({
        currentViz: selection,
    }).then(()=>{
        console.log("update pushed: "+selection);
    }).catch(error =>{
        console.error("Error writing document: ", error);
    });
}
export function listenBirthday(callback){
    db.collection("week4").onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
            callback(change);
        });
        //console.log(importList);
    });
}

export function listenCommute(callback){
    db.collection("answersweek2").onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
            callback(change);
        });
        //console.log(importList);
    });
}

export function listenOrigins(callback){
    db.collection("answersweek3").onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
            callback(change);
        });
        //console.log(importList);
    });
}

export function listenEmotions(callback){
    db.collection("emotions").onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
            callback(change);
        });
        //console.log(importList);
    });
}
export function vizListen(callback){
    db.collection("dataview").doc("viz").onSnapshot(doc =>{
        callback(doc);
    });
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