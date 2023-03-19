import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateAluno = () => {

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [turma_id, setTurmaId] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        api.get(`/alunos/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setMatricula(response.data.matricula);
                setDataNascimento(response.data.dataNascimento);
                setEmail(response.data.email);
                setEndereco(response.data.endereco);
                setTurmaId(response.data.turma_id);
            })

    }, [id]);

    async function handleUpdateAluno(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const data = {
            id: parseInt(String(id)),
            nome,
            matricula,
            dataNascimento,
            email,
            endereco,
            turma_id
        };

        try {

            await api.put('/alunos', data);
            alert('Aluno atualizado com sucesso!');
            navigate('/alunos');

        } catch (error) {
            alert('Erro ao atualizar o Aluno!');
            console.error(error);
        }

    }

    return (

        <div className="container">
            <div className="row">
                <h3>Cadastrar Aluno</h3>


                <form onSubmit={handleUpdateAluno}>

                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>

                        <label>Endereço de email</label>
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
                        <input className="form-control" type="text"
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

export default UpdateAluno ;