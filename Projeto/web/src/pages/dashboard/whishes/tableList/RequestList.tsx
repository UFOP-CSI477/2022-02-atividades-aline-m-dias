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
import { deleteStudent, getStudents } from 'src/redux/slices/student';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import TablePaginationTranslation from '../../../../components/TablePaginationTranslation';
import WishesTableRow from './list/WishesTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: 'Nome', align: 'left' },
  { id: 'email', label: 'E-mail', align: 'left' },
  { id: 'registration', label: 'Matricula', align: 'left' },
  { id: 'birthDate', label: 'Data de nascimento', align: 'left' },
  { id: 'address', label: 'Endereço', align: 'left' },
];

// ----------------------------------------------------------------------

export default function RequestsList() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { students, count } = useSelector((state) => state.student);

  const { dense, page, order, orderBy, rowsPerPage, onChangePage, onChangeRowsPerPage, setPage } =
    useTable();

  const isNotFound = !students;

  useEffect(() => {
    dispatch(
      getStudents({
        step: rowsPerPage,
        page: page,
      })
    );
  }, [rowsPerPage, page, dispatch]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.student.edit(id));
  };

  const handleDeleteRow = async (id: number) => {
    await dispatch(deleteStudent(id));
    enqueueSnackbar('Aluno deletado com sucesso', { variant: 'success' });

    const calc = Math.ceil((count - 1) / rowsPerPage) - 1;

    if (page > calc) {
      setPage(calc);
    } else {
      dispatch(
        getStudents({
          step: rowsPerPage,
          page: page,
        })
      );
    }
  };

  return (
    <Page title="Lista de alunos">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Lista de alunos"
          links={[{ name: '' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.student.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Cadastrar novo aluno
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />
                <TableBody>
                  {students.map((row) => (
                    <WishesTableRow
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
