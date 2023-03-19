import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


const CreateDisciplina = () => {

    const [nome, setNome] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [Universidade, setUniversidade] = useState('');
    const [professor_id, setProfessorId] = useState('');
    const [tarefa_id, setTarefaId] = useState('');
    
    const navigate = useNavigate();

    const handleNewDici = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            nome, 
            cargaHoraria, 
            Universidade, 
            email, 
            endereco, 
            turma_id
        }

        try {
            
            await api.post('/alunos', data);
            <div className="alert alert-success" role="alert">
                    Aluno inserido com sucesso !
            </div>
        
            navigate('/alunos');

        } catch (error) {

            <div className="alert alert-danger" role="alert">
                Erro ao cadastrar o Aluno!
            </div>
            console.error(error);
        }

    }


    return(

        <div className="container">
            <div className="row">
                <h3>Cadastrar Aluno</h3>

                
                <form onSubmit={handleNewAluno}>

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
                        <label htmlFor="cargaHoraria">Sigla</label>
                        <input className="form-control"type="text"
                            name="cargaHoraria"
                            id="cargaHoraria"
                            value={cargaHoraria}
                            placeholder="Digite sua matrícula"
                            onChange={e => setCargaHoraria] = useState('');(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Digite seu email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endereco">Endereco</label>
                        <input className="form-control" type="text"
                            name="endereco"
                            id="endereco"
                            value={endereco}
                            placeholder="Digite seu endereco"
                            onChange={e => setEndereco(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="turma_id">Turma</label>
                        <input className="form-control" type="text"
                            name="turma_id"
                            id="turma_id"
                            value={turma_id}
                            placeholder="Digite sua turma"
                            onChange={e => setTurmaId(e.target.value)}
                        />
                    </div>

                    
                    <button className="btn btn-outline-primary px-10 mt-10" type="submit">Cadastrar</button>
                    <button className="btn btn-outline-primary px-10 mt-10" type="reset">Limpar</button>
                    <Link  className ="btn btn-outline-primary px-10 mt-10"to="/alunos">Voltar</Link>
                </form>

            </div>
           

        </div>

    );



}

export default CreateAluno;