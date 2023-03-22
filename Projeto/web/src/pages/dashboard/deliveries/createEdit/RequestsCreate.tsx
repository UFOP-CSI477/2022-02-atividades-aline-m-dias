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
import { clearData, getDeliveries, getDelivery } from 'src/redux/slices/deliveries';
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
      dispatch(getDelivery(Number(id)));
    }
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getDeliveries({ step: 100, page: 0 }));
  }, [dispatch]);

  return (
    <Page title="Lista de entregas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastrar de entregas"
          links={[{ name: 'lista de entregas', href: PATH_DASHBOARD.deliveries.list }]}
        />

        <RequestNewEditForm isEdit={isEdit} id={id} />
      </Container>
    </Page>
  );
}
