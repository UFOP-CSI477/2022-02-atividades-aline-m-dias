import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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

export default function Register() {
  return (
    <Page title="Register">
      <RootStyle>
        <Container>
          <ContentStyle>
            <RegisterForm />

            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Você possui uma conta?
              <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                Login
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
