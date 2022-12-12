import {createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
  },
  reducers: {
    savingNewNote: (state, /*action*/) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNotes: (state, action) => {
      state.activeNote = action.payload;
    },
    setNotes: (state, action) => {

    },
    setSaving: (state, action) => {

    },
    updateNote: (state, action) => {

    },
  }
})

export const {savingNewNote, addNewEmptyNote, setActiveNotes, setNotes, setSaving, updateNote} = journalSlice.actions