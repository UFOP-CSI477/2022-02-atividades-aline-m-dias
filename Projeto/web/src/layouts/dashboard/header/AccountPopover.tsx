import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Divider, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Falha ao sair do sistema', { variant: 'error' });
    }
  };

  return (
    <>
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Button variant="outlined" onClick={handleLogout} sx={{ m: 1 }}>
        Deslogar
      </Button>
    </>
  );
}
