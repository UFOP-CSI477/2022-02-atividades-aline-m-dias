import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { createTeacher, updateTeacher } from 'src/redux/slices/teacher';
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

  const { teacher } = useSelector((state) => state.teacher);

  const { enqueueSnackbar } = useSnackbar();

  const NewTeacherSchema = Yup.object().shape({
    name: Yup.string().required('Campo requirido'),
    email: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      email: teacher?.email || '',
      name: teacher?.name || '',
    },

    validationSchema: NewTeacherSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        isEdit
          ? await dispatch(updateTeacher(values.id, values))
          : await dispatch(createTeacher(values));
        enqueueSnackbar(
          !isEdit ? 'Professor criado com sucesso!' : 'Professor atualizado com sucesso!'
        );
        resetForm();
        navigate(PATH_DASHBOARD.teacher.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar Professor. ${error?.message}`
            : `Erro ao atualizar Professor. ${error?.message}`,
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
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={!(dirty && isValid)}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? 'Criar professor' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
