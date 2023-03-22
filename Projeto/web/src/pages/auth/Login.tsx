// @mui
import { Box, Card, Container, Link, Stack, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';

// sections
import { PATH_AUTH } from 'src/routes/paths';
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: 0,
  maxWidth: 680,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const mdUp = useResponsive('up', 'md');

  const theme = useTheme();

  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Faça login
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Preencha com seus dados.</Typography>
              </Box>
            </Stack>

            <LoginForm />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Criar uma conta
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
