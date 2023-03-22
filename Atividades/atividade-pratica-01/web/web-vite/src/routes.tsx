import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import ListEstados from './components/estados/ListEstados';
import CreateEstado from './components/estados/CreateEstado';
import UpdateEstado from './components/estados/UpdateEstado';

import ListCidades from './components/cidades/ListCidades';
import CreateCidades from './components/cidades/CreateCidades';
import UpdateCidades from './components/cidades/UpdateCidades';

import ListDoacoes from './components/doacoes/ListDoacoes';

const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> } />

                <Route path="/estados" element={ <ListEstados /> } />
                <Route path="/estados/create" element={ <CreateEstado /> } />
                <Route path="/estados/update/:id" element={<UpdateEstado />} />

                <Route path="/cidades" element={<ListCidades />} />
                <Route path="/cidades/create" element={ <CreateCidades /> } />
                <Route path="/cidades/update/:id" element={ <UpdateCidades /> } />

                
                <Route path="/doacoes" element={<ListDoacoes />} />

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;