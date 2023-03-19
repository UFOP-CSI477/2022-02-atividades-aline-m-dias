import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProfessor = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        api.get(`/professores/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setEmail(response.data.email);
               
            })

    }, [id]);

    async function handleUpdateProfessor(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const data = {
            id: parseInt(String(id)),
            nome,
            email
        };

        try {

            await api.put('/professores', data);
            alert('Professor atualizado com sucesso!');
            navigate('/professores');

        } catch (error) {
            alert('Erro ao atualizar o Professor!');
            console.error(error);
        }

    }

    return (

        <div className="container">
            <div className="row">
                <h3>Atualizar Dados</h3>


                <form onSubmit={handleUpdateProfessor}>

                    <div className="form-group">


                        <label>Digite seu nome</label>
                        <input className="form-control" type="text"
                            name="nome"
                            id="nome"
                            value={nome}
                            placeholder="Nome"
                            onChange={e => setNome(e.target.value)}
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

                    
                    <button className="btn btn-outline-primary px-10 mt-10" type="submit">Atualizar</button>
                    <Link  className ="btn btn-outline-primary px-10 mt-10"to="/alunos">Voltar</Link>
                </form>

            </div>
        </div>
    );



}

export default UpdateProfessor ;