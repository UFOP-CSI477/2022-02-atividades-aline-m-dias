import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { useEffect } from 'react';
import { getClasses } from 'src/redux/slices/class';
import { getStudents } from 'src/redux/slices/student';
import { createTask, updateTask } from 'src/redux/slices/task';
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

  const { task } = useSelector((state) => state.task);
  const { students } = useSelector((state) => state.student);
  const { classes } = useSelector((state) => state.class);

  const { enqueueSnackbar } = useSnackbar();

  const NewTaskSchema = Yup.object().shape({
    description: Yup.string().required('Campo requirido'),
    deliveryDate: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      description: task?.description || '',
      deliveryDate: task?.deliveryDate || '',
      studentId: task?.studentId || '',
      classId: task?.classId || '',
    },

    validationSchema: NewTaskSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        isEdit ? await dispatch(updateTask(values.id, values)) : await dispatch(createTask(values));
        enqueueSnackbar(!isEdit ? 'Tarefa criada com sucesso!' : 'Tarefa atualizada com sucesso!');
        resetForm();
        navigate(PATH_DASHBOARD.task.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar tarefa. ${error?.message}`
            : `Erro ao atualizar tarefa. ${error?.message}`,
          { variant: 'error' }
        );
        resetForm();
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid, dirty } = formik;

  useEffect(() => {
    dispatch(getStudents({ step: 100, page: 0 }));
    dispatch(getClasses({ step: 100, page: 0 }));
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
              label="Descrição"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />

            <TextField
              label="Data de entrega"
              type="date"
              {...getFieldProps('deliveryDate')}
              error={Boolean(touched.deliveryDate && errors.deliveryDate)}
              helperText={touched.deliveryDate && errors.deliveryDate}
            />

            <TextField
              select
              fullWidth
              label="Estudantes"
              {...getFieldProps('studentId')}
              SelectProps={{ native: true }}
            >
              <option />
              {students.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Turmas"
              {...getFieldProps('classId')}
              SelectProps={{ native: true }}
            >
              <option />
              {classes.map((option) => (
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
              {!isEdit ? 'Criar tarefa' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
