import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { useEffect } from 'react';
import { createDiscipline, updateDiscipline } from 'src/redux/slices/discipline';
import { getTasks } from 'src/redux/slices/task';
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

  const { discipline } = useSelector((state) => state.discipline);
  const { tasks } = useSelector((state) => state.task);
  const { teachers } = useSelector((state) => state.teacher);

  const { enqueueSnackbar } = useSnackbar();

  const NewDisciplineSchema = Yup.object().shape({
    name: Yup.string().required('Campo requirido'),
    workload: Yup.string().required('Campo requirido'),
    university: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      name: discipline?.name || '',
      workload: discipline?.workload || '',
      university: discipline?.university || '',
      teacherId: discipline?.teacherId || '',
      taskId: discipline?.taskId || '',
    },

    validationSchema: NewDisciplineSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        isEdit
          ? await dispatch(updateDiscipline(values.id, values))
          : await dispatch(createDiscipline(values));
        enqueueSnackbar(
          !isEdit ? 'Disciplina criada com sucesso!' : 'Disciplina atualizada com sucesso!'
        );
        resetForm();
        navigate(PATH_DASHBOARD.discipline.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar disciplina. ${error?.message}`
            : `Erro ao atualizar disciplina. ${error?.message}`,
          { variant: 'error' }
        );
        resetForm();
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid, dirty } = formik;

  useEffect(() => {
    dispatch(getTeachers({ step: 100, page: 0 }));
    dispatch(getTasks({ step: 100, page: 0 }));
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
              label="Carga horaria"
              {...getFieldProps('workload')}
              error={Boolean(touched.workload && errors.workload)}
              helperText={touched.workload && errors.workload}
            />

            <TextField
              label="Universidade"
              {...getFieldProps('university')}
              error={Boolean(touched.university && errors.university)}
              helperText={touched.university && errors.university}
            />

            <TextField
              select
              fullWidth
              label="Tarefas"
              {...getFieldProps('taskId')}
              SelectProps={{ native: true }}
            >
              <option />
              {tasks.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Professores"
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
              {!isEdit ? 'Criar nova disciplina' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
