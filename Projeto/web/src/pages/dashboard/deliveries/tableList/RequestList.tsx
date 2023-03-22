import { useEffect } from 'react';
// @mui
import { Box, Button, Card, Container, Table, TableBody, TableContainer } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
import useTable from 'src/hooks/useTable';
// components
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
// sections
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { deleteDelivery, getDeliveries } from 'src/redux/slices/deliveries';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import TablePaginationTranslation from '../../../../components/TablePaginationTranslation';
import DeliveryTableRow from './list/DeliveryTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'deliveryDate', label: 'Data de entrega', align: 'left' },
  { id: 'grades', label: 'Notas', align: 'left' },
  { id: 'student', label: 'Estudante', align: 'left' },
];

// ----------------------------------------------------------------------

export default function RequestsList() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { deliveries, count } = useSelector((state) => state.deliveries);

  const { dense, page, order, orderBy, rowsPerPage, onChangePage, onChangeRowsPerPage, setPage } =
    useTable();

  const isNotFound = !deliveries;

  useEffect(() => {
    dispatch(
      getDeliveries({
        step: rowsPerPage,
        page: page,
      })
    );
  }, [rowsPerPage, page, dispatch]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.deliveries.edit(id));
  };

  const handleDeleteRow = async (id: number) => {
    await dispatch(deleteDelivery(id));
    enqueueSnackbar('Entrega deletada com sucesso', { variant: 'success' });

    const calc = Math.ceil((count - 1) / rowsPerPage) - 1;

    if (page > calc) {
      setPage(calc);
    } else {
      dispatch(
        getDeliveries({
          step: rowsPerPage,
          page: page,
        })
      );
    }
  };

  return (
    <Page title="Lista de entregas">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Lista de entregas"
          links={[{ name: '' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.deliveries.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Cadastrar nova entrega
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />
                <TableBody>
                  {deliveries.map((row) => (
                    <DeliveryTableRow
                      key={row.id}
                      row={row}
                      onEditRow={() => handleEditRow(Number(row.id))}
                      onDeleteRow={() => handleDeleteRow(Number(row.id))}
                    />
                  ))}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePaginationTranslation
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
