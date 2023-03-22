import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { createStudent, updateStudent } from 'src/redux/slices/student';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDispatch, useSelector } from '../../../../../redux/store';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  id?: string;
};

export default function RequestNewEditForm({ isEdit, id }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { student } = useSelector((state) => state.student);

  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
    name: Yup.string().required('Campo requirido'),
    email: Yup.string().required('Campo requirido'),
    registration: Yup.string().required('Campo requirido'),
    birthDate: Yup.string().required('Campo requirido'),
    address: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      address: student?.address || '',
      birthDate: student?.birthDate || '',
      email: student?.email || '',
      name: student?.name || '',
      registration: student?.registration || '',
    },

    validationSchema: NewStudentSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        isEdit
          ? await dispatch(updateStudent(values.id, values))
          : await dispatch(createStudent(values));
        enqueueSnackbar(!isEdit ? 'Aluno criado com sucesso!' : 'Aluno atualizado com sucesso!');
        resetForm();
        navigate(PATH_DASHBOARD.student.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar aluno. ${error?.message}`
            : `Erro ao atualizar aluno. ${error?.message}`,
          { variant: 'error' }
        );
        resetForm();
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid, dirty } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <TextField
              label="Nome"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              label="E-mail"
              type="email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              label="Matricula"
              {...getFieldProps('registration')}
              error={Boolean(touched.registration && errors.registration)}
              helperText={touched.registration && errors.registration}
            />

            <TextField
              label="Data de nascimento"
              type="date"
              {...getFieldProps('birthDate')}
              error={Boolean(touched.birthDate && errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
            />

            <TextField
              label="Endereço"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={!(dirty && isValid)}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? 'Criar aluno' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
