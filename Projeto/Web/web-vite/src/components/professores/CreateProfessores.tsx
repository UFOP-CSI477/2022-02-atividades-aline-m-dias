import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProfessores = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
   
    const navigate = useNavigate();

    const handleNewProfessor = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            nome, 
            email
        }

        try {
            
            await api.post('/professores', data);
            alert('Professor inserido com sucesso');
            navigate('/professores');


        } catch (error) {

            alert('Erro ao cadastrar o Professor!');
            console.error(error);
        }

    }


    return(

        <div className="container">
            <div className="row">
                <h3>Cadastrar Professor</h3>

                
                <form onSubmit={handleNewProfessor}>

                    <div className="form-group">
                        <label>Nome</label>
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

                    
                    <button className="btn btn-outline-primary px-10 mt-10" type="submit">Cadastrar</button>
                    <button className="btn btn-outline-primary px-10 mt-10" type="reset">Limpar</button>
                    <Link  className ="btn btn-outline-primary px-10 mt-10"to="/alunos">Voltar</Link>
                </form>

            </div>
           

        </div>

    );



}

export default CreateProfessores;