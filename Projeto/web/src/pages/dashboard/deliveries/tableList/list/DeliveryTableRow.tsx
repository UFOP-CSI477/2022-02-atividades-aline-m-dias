import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { DeliveriesProps } from 'src/redux/slices/deliveries';
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

type Props = {
  row: DeliveriesProps;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DeliveryTableRow({ row, onEditRow, onDeleteRow }: Props) {
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

      <TableCell align="left">{fDate(row?.deliveryDate)}</TableCell>

      <TableCell align="left">{row?.grades}</TableCell>

      <TableCell align="left">{row?.student.name}</TableCell>

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
