import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom'
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";

import {AuthLayout} from "../layout/AuthLayout";

import {startGoogleSignIn, startLoginWithEmailPassword} from "../../store/auth/index.js";
import {useForm} from "../../hooks/index.js";
import {useMemo} from "react";

export const LoginPage = () => {
  const {status, errorMessage} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const {email, password, onInputChange} = useForm({
    email: '',
    password: ''
  })

  const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const handleGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Password'
              type='password'
              placeholder='******'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth type='submit'
                disabled={isAuthenticated}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                disabled={isAuthenticated}
                onClick={handleGoogleSignIn}
              >
                <Google/>
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}