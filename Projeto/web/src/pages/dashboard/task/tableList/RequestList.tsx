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
import { deleteTask, getTasks } from 'src/redux/slices/task';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import TablePaginationTranslation from '../../../../components/TablePaginationTranslation';
import TaskTableRowTableRow from './list/TaskTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'description', label: 'Descrição', align: 'left' },
  { id: 'deliveryDate', label: 'Data de entrega', align: 'left' },
  { id: 'student', label: 'Aluno', align: 'left' },
  { id: 'class', label: 'turna', align: 'left' },
];

// ----------------------------------------------------------------------

export default function RequestsList() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { tasks, count } = useSelector((state) => state.task);

  const { dense, page, order, orderBy, rowsPerPage, onChangePage, onChangeRowsPerPage, setPage } =
    useTable();

  const isNotFound = !tasks;

  useEffect(() => {
    dispatch(
      getTasks({
        step: rowsPerPage,
        page: page,
      })
    );
  }, [rowsPerPage, page, dispatch]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.task.edit(id));
  };

  const handleDeleteRow = async (id: number) => {
    await dispatch(deleteTask(id));
    enqueueSnackbar('Tarefa deletada com sucesso', { variant: 'success' });

    const calc = Math.ceil((count - 1) / rowsPerPage) - 1;

    if (page > calc) {
      setPage(calc);
    } else {
      dispatch(
        getTasks({
          step: rowsPerPage,
          page: page,
        })
      );
    }
  };

  return (
    <Page title="Lista de tarefas">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Lista de tarefas"
          links={[{ name: '' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.task.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Cadastrar nova tarefa
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />
                <TableBody>
                  {tasks.map((row) => (
                    <TaskTableRowTableRow
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
