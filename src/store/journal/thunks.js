import {doc, collection, setDoc} from "firebase/firestore";
import {FirebaseDB} from "../../firebase/index.js";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from "./journalSlice.js";
import {fileUpload, loadNotes} from "../../helpers/index.js";

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
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    const notas = await loadNotes(uid);

    dispatch(setNotes(notas));
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const {uid} = getState().auth;
    const {activeNote} = getState().journal;

    const noteToFireStore = {...activeNote};
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
    await setDoc(docRef, noteToFireStore, {merge: true});

    dispatch(updateNote(activeNote));
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // await fileUpload(files[0]);

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photoUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photoUrls));
  }
}