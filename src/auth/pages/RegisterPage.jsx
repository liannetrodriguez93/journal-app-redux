import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
import {AuthLayout} from "../layout/AuthLayout";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {startCreatingUserWithEmailPassword} from "../../store/auth/index.js";
import {useMemo} from "react";

const initialValue = {
  displayName: '',
  email: '',
  password: ''
}

const schema = Yup.object().shape({
  displayName: Yup.string().ensure().required("Field is required"),
  email: Yup.string().email('Not a valid email').ensure().required("Field is required"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ).ensure().required("Field is required")
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const {status, errorMessage} = useSelector(state => state.auth);

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  });

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const onSubmit = (data) => {
    dispatch(startCreatingUserWithEmailPassword(data));
  }

  return (
    <AuthLayout title='Registro'>
      <form className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Nombre Completo'
              placeholder='John Doe'
              fullWidth
              required
              error={!!errors?.displayName?.message}
              helperText={!!errors?.displayName?.message ? errors.displayName?.message : null}
              {...register('displayName')}
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              required
              error={!!errors?.email?.message}
              helperText={!!errors?.email?.message ? errors.email?.message : null}
              {...register('email')}
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Password'
              type='password'
              placeholder='******'
              fullWidth
              required
              error={!!errors?.password?.message}
              helperText={!!errors?.password?.message ? errors.password?.message : null}
              {...register('password')}
            />
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={isCheckingAuthentication}
                onClick={handleSubmit(onSubmit)}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}