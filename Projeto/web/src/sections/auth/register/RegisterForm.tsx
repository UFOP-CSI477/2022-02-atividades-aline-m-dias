import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { useSnackbar } from 'notistack';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  name: string;
  photo_url: string;
  afterSubmit?: string;
};

export default function RegisterForm() {
  const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Nome é requerido'),
    email: Yup.string().email('Email precisa ser valido').required('Email é requerido'),
    password: Yup.string().required('Password é requerido'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await register(data.email, data.password, data.email, data.photo_url);

      enqueueSnackbar('Administrador registrado com sucesso', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: 'error',
      });
      console.error(error);
      //reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="name" label="Name" />

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
