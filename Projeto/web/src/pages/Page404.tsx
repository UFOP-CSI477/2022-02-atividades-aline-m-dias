import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets

// ----------------------------------------------------------------------

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

export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Página não encontrada
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              Desculpe, não conseguimos encontrar a página que você está procurando. Talvez você
              tenha digitado incorretamente o URL? Certifique-se de verificar sua ortografia.
            </Typography>
          </m.div>

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Voltar para home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
