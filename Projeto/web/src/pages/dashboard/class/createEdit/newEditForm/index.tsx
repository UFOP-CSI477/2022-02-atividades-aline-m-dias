import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { useEffect } from 'react';
import { createClass, updateClass } from 'src/redux/slices/class';
import { getTeachers } from 'src/redux/slices/teacher';
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

  const { class: team } = useSelector((state) => state.class);

  const { teachers } = useSelector((state) => state.teacher);

  const { enqueueSnackbar } = useSnackbar();

  const NewClassSchema = Yup.object().shape({
    name: Yup.string().required('Campo requirido'),
    year: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      name: team?.name || '',
      year: team?.year || '',
      teacherId: team?.teacherId || '',
    },

    validationSchema: NewClassSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        isEdit
          ? await dispatch(updateClass(values.id, values))
          : await dispatch(createClass(values));
        enqueueSnackbar(!isEdit ? 'Turma criada com sucesso!' : 'Turma atualizada com sucesso!');
        resetForm();
        navigate(PATH_DASHBOARD.class.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar turma. ${error?.message}`
            : `Erro ao atualizar turma. ${error?.message}`,
          { variant: 'error' }
        );
        resetForm();
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid, dirty } = formik;

  useEffect(() => {
    dispatch(getTeachers({ step: 100, page: 0 }));
  }, []);

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
              label="Ano"
              {...getFieldProps('year')}
              error={Boolean(touched.year && errors.year)}
              helperText={touched.year && errors.year}
            />
            <TextField
              select
              fullWidth
              label="Professor"
              {...getFieldProps('teacherId')}
              SelectProps={{ native: true }}
            >
              <option />
              {teachers.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={!(dirty && isValid)}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? 'Criar turma' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
