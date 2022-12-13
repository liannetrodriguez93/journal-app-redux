import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {SaveOutlined, UploadOutlined} from "@mui/icons-material";
import {ImageGallery} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/index.js";
import {useEffect, useMemo, useRef} from "react";
import {setActiveNote, startSaveNote, startUploadingFiles} from "../../store/journal/index.js";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  const dispatch = useDispatch();
  const {activeNote, messageSaved, isSaving} = useSelector(state => state.journal)

  const {body, title, date, imageUrls, onInputChange, formState} = useForm(activeNote);

  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [formState]);

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);


  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onInputFileChange = ({target}) => {
    if(target.files === 0) return;

    dispatch(startUploadingFiles(target.files));

  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{mb: 1}}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>
      <Grid item>
        <input
          type='file'
          multiple
          onChange={onInputFileChange}
          style={{display: 'none'}}
          ref={fileInputRef}
        />
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined/>
        </IconButton>
        <Button
          color='primary'
          sx={{p: 2}}
          disabled={isSaving}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          name='title'
          fullWidth
          placeholder='Ingrese un Titulo'
          label='Titulo'
          value={title}
          onChange={onInputChange}
          sx={{border: 'none', mb: 1}}
        />

        <TextField
          type='text'
          variant='filled'
          name='body'
          fullWidth
          multiline
          placeholder='Que sucedio hoy?'
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>

      <ImageGallery/>
    </Grid>
  );
}