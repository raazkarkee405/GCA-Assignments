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

export async function getNoteList() {
    const snapshot = await firebase.firestore().collection(NOTES).get();
    return snapshot.docs.map(doc => doc);
}

export function updateNote(noteInfo, id) {
    return new Promise(async function(resolve, reject) {
        await firebase.firestore().collection(NOTES).doc('/'+id).update({
            title: noteInfo.title,
            description: noteInfo.description,
            deadline: noteInfo.deadline
        }).then(function(response){
            resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}


