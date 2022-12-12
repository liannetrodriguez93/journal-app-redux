import {doc, collection, setDoc} from "firebase/firestore";
import {FirebaseDB} from "../../firebase/index.js";
import {addNewEmptyNote, savingNewNote, setActiveNotes, setNotes} from "./journalSlice.js";
import {loadNotes} from "../../helpers/index.js";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const {uid} = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const newDoc = doc(collection(FirebaseDB, `/${uid}/journal/notes`))

    await setDoc (newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNotes(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    const notas = await loadNotes(uid);

    dispatch(setNotes(notas));
  }
}