import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


const CreateDisciplina = () => {

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [turma_id, setTurmaId] = useState('');

    
    const navigate = useNavigate();

    const handleNewAluno = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            nome, 
            matricula, 
            dataNascimento, 
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
                        <label htmlFor="matricula">Sigla</label>
                        <input className="form-control"type="text"
                            name="matricula"
                            id="matricula"
                            value={matricula}
                            placeholder="Digite sua matrícula"
                            onChange={e => setMatricula(e.target.value)}
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