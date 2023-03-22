import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { useEffect } from 'react';
import { createDelivery, updateDelivery } from 'src/redux/slices/deliveries';
import { getStudents } from 'src/redux/slices/student';
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

  const { delivery } = useSelector((state) => state.deliveries);
  const { students } = useSelector((state) => state.student);

  const { enqueueSnackbar } = useSnackbar();

  const NewDeliverySchema = Yup.object().shape({
    deliveryDate: Yup.string().required('Campo requirido'),
    grades: Yup.number().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      deliveryDate: delivery?.deliveryDate || '',
      grades: delivery?.grades || '',
      studentId: delivery?.studentId || '',
    },

    validationSchema: NewDeliverySchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        isEdit
          ? await dispatch(updateDelivery(values.id, values))
          : await dispatch(createDelivery(values));
        enqueueSnackbar(
          !isEdit ? 'Entrega criada com sucesso!' : 'Entrega atualizada com sucesso!'
        );
        resetForm();
        navigate(PATH_DASHBOARD.deliveries.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar entrega. ${error?.message}`
            : `Erro ao atualizar entrega. ${error?.message}`,
          { variant: 'error' }
        );
        resetForm();
      }
    },
  });

  useEffect(() => {
    dispatch(getStudents({ step: 100, page: 0 }));
  }, []);

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
              label="Data de entrega"
              {...getFieldProps('deliveryDate')}
              type="date"
              error={Boolean(touched.deliveryDate && errors.deliveryDate)}
              helperText={touched.deliveryDate && errors.deliveryDate}
            />

            <TextField
              label="Nota"
              type="number"
              {...getFieldProps('grades')}
              error={Boolean(touched.grades && errors.grades)}
              helperText={touched.grades && errors.grades}
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
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={!(dirty && isValid)}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? 'Criar nova entrega' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
