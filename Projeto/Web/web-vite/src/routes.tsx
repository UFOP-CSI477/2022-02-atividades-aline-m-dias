import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';

import ListAlunos from './components/alunos/ListAlunos';
import CreateAlunos from './components/alunos/CreateAlunos';
import UpdateAlunos from './components/alunos/UpdateAlunos';

import CreateProfessores from './components/professores/CreateProfessores';
import ListProfessores from './components/professores/ListProfessores';

const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> } />

                <Route path="/alunos" element={ <ListAlunos /> } />
                <Route path="/professores" element={ <ListProfessores /> } />
                
                <Route path="/alunos/create" element={ <CreateAlunos /> } />
                <Route path="/professores/create" element={ <CreateProfessores /> } />

                <Route path="/estados/update" element={<UpdateAlunos />} />
                


                {/* <Route path="/estados/create" element={ <CreateEstado /> } />

                <Route path="/estados/update/:id"
                    element={<UpdateEstado />} />

                <Route path="/cidades" 
                    element={<ListCidades />} />

                <Route path="/cidades/create" element={ <CreateCidade /> } /> */}

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;