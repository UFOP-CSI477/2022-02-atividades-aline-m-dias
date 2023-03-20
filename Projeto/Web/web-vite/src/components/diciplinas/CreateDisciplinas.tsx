import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


const CreateDisciplinas = () => {

    
    const [nome, setNome] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [Universidade, setUniversidade] = useState('');
    const [professor_id, setProfessorId] = useState('');
    const [tarefa_id, setTarefaId] = useState('');
    
    const navigate = useNavigate();


    const handleNewDisciplinas = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            nome, 
                cargaHoraria, 
                Universidade,
                professor: {
                        connect: {
                            id: professor_id
                        }
                    },
                
                tarefa_id
        }

        try {
            
            await api.post('/disciplinas', data);
            navigate('/disciplinas');

        } catch (error) {

            alert('Erro ao cadastrar a disciplina!');
            console.error(error);
            console.error(error);
        }

    }
    return(

        <div className="container">
        <div className="row">
            <h3>Cadastrar Disciplinas</h3>

            
            <form onSubmit={handleNewDisciplinas}>

                <div className="form-group">
                    <label  htmlFor="nome">Nome</label>
                    <input className="form-control" type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        placeholder="Nome"
                        onChange={e => setNome(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cargaHoraria">Carga Horária</label>
                    <input className="form-control"type="text"
                        name="cargaHoraria"
                        id="cargaHoraria"
                        value={cargaHoraria}
                        placeholder="Digite a carga horária"
                        onChange={e => setCargaHoraria(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Universidade">Universidade</label>
                    <input className="form-control"type="text"
                        name="Universidade"
                        id="Universidade"
                        value={Universidade}
                        placeholder="Digite a universidade"
                        onChange={e => setUniversidade(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="professor_id">professor_id</label>
                    <input className="form-control" type="text"
                        name="professor_id"
                        id="professor_id"
                        value={professor_id}
                        placeholder="Digite seu professor_id"
                        onChange={e => setProfessorId(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tarefa_id">Turma</label>
                    <input className="form-control" type="text"
                        name="tarefa_id"
                        id="tarefa_id"
                        value={tarefa_id}
                        placeholder="Digite sua Tarefa"
                        onChange={e => setTarefaId(e.target.value)}
                    />
                </div>

                
                <button className="btn btn-outline-primary px-10 mt-10" type="submit">Cadastrar</button>
                <Link  className ="btn btn-outline-primary px-10 mt-10"to="/disciplinas">Voltar</Link>
            </form>

        </div>
       

    </div>

    );



}

export default CreateDisciplinas;