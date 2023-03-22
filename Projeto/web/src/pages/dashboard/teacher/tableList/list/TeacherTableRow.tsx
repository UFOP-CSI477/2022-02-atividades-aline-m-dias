import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { TeacherProps } from 'src/redux/slices/teacher';

// ----------------------------------------------------------------------

type Props = {
  row: TeacherProps;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function TeacherTableRow({ row, onEditRow, onDeleteRow }: Props) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{row?.id}</TableCell>

      <TableCell align="left">{row?.name}</TableCell>

      <TableCell align="left">{row?.email}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
