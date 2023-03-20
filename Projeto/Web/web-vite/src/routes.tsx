import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';

import ListAlunos from './components/alunos/ListAlunos';
import CreateAlunos from './components/alunos/CreateAlunos';
import UpdateAlunos from './components/alunos/UpdateAlunos';
import DeleteAlunos from './components/alunos/DeleteAlunos';

import CreateProfessores from './components/professores/CreateProfessores';
import ListProfessores from './components/professores/ListProfessores';
import UpdateProfessor from './components/professores/UpdateProfessores';

import ListDisciplinas from './components/diciplinas/ListDisciplinas';
import CreateDisciplinas from './components/diciplinas/CreateDisciplinas';


import ListTarefas from './components/tarefas/ListTarefas';
import CreateTarefas from './components/tarefas/CreateTarefas';


const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> } />

                <Route path="/alunos" element={ <ListAlunos /> } />     
                <Route path="/alunos/create" element={ <CreateAlunos /> } />
                <Route path="/alunos/update/:id" element={<UpdateAlunos />} />
                <Route path="/alunos/delete/:id" element={<DeleteAlunos />} />
              

                <Route path="/professores" element={ <ListProfessores /> } />
                <Route path="/professores/create" element={ <CreateProfessores /> } />
                <Route path="/professores/update/:id" element={<UpdateProfessor />} />


                <Route path="/disciplinas" element={ <ListDisciplinas /> } />
                <Route path="/disciplinas/create" element={ <CreateDisciplinas /> } />
                
                <Route path="/tarefas" element={ <ListTarefas /> } />
                <Route path="/tarefas/create" element={ <CreateTarefas/> } />


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