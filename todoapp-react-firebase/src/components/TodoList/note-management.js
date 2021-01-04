import firebase from '../../services/firebase';
import {NOTES} from './config';

export function createNote(noteInfo) {
    return new Promise(async function (resolve, reject){
        await firebase.firestore().collection(NOTES).add({
            title: noteInfo.title,
            description: noteInfo.description,
            deadline: noteInfo.deadline
        }).then(response => {
           resolve(response);
        }).catch(error =>{
            reject(error);
        })
    })
}

// export async function getNoteList() {
//     // const snapshot = await firebase.firestore().collection(NOTES).get();
//     // return snapshot.docs.map(doc => doc);
//     const db = firebase.firestore();
//     return db.collection(NOTES).onSnapshot(snapshot => {
//         const notesData = [];
//         const aa = snapshot.forEach(doc => notesData.push({...doc.data(), id: doc.id}))
//         notesData(aa);
//     })
// }

export function updatingNote(noteInfo, id) {
    return new Promise(async function(resolve, reject) {
        await firebase.firestore().collection(NOTES).doc("/"+id).update({
            "title": noteInfo.title,
            "description": noteInfo.description,
            "deadline": noteInfo.deadline,
            
        }).then(function(response){
            resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}


export async function deletingNote(id) {
    try {
        await firebase.firestore().collection(NOTES).doc("/" + id).delete();
        console.log("Deleted Successfully");
    } catch (error) {
        console.log("Error removing document", error);
    }
}

