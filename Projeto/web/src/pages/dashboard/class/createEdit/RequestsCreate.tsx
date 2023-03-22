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
import { getClass, getClasses } from 'src/redux/slices/class';
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
      dispatch(getClass(Number(id)));
    }
    return () => {
      //dispatch(clearTheme());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getClasses({ step: 100, page: 0 }));
  }, [dispatch]);

  return (
    <Page title="Lista de turmas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastrar de turmas"
          links={[{ name: 'lista de turmas', href: PATH_DASHBOARD.class.list }]}
        />

        <RequestNewEditForm isEdit={isEdit} id={id} />
      </Container>
    </Page>
  );
}
