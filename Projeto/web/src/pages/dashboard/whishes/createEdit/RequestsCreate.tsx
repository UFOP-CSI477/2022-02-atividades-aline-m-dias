// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
// sections
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { getStudent, getStudents } from '../../../../redux/slices/student';
import { useDispatch } from '../../../../redux/store';
import RequestNewEditForm from './newEditForm';

// ----------------------------------------------------------------------

export default function RequestsCreate() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit');

  useEffect(() => {
    if (id) {
      dispatch(getStudent(Number(id)));
    }
    return () => {
      //dispatch(clearTheme());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getStudents({ step: 100, page: 0 }));
  }, [dispatch]);

  return (
    <Page title="Lista de alunos">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastrar de alunos"
          links={[{ name: 'lista de alunos', href: PATH_DASHBOARD.student.list }]}
        />

        <RequestNewEditForm isEdit={isEdit} id={id} />
      </Container>
    </Page>
  );
}
