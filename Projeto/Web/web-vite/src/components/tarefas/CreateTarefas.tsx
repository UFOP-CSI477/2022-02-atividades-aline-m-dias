import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTarefas = () => {

    const [descricao, setDescricao] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [turma_id, setTurmaId] = useState('');
    const [aluno_id, setAlunoId] = useState('');
   
    const navigate = useNavigate();

    const handleNewTarefa = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            descricao, 
            dataEntrega, 
            turma_id,
            aluno_id
        }

        try {
            
            await api.post('/tarefas', data);
            alert('Tarefa inserida com sucesso');
            navigate('/tarefas');


        } catch (error) {

            alert('Erro ao cadastrar a Tarefa!');
            console.error(error);
        }

    }


    return(

        <div className="container">
            <div className="row">
                <h3>Cadastrar Tarefa</h3>

                
                <form onSubmit={handleNewTarefa}>

                    <div className="form-group">
                        <label>Descricao</label>
                        <input className="form-control" type="text"
                            name="descricao"
                            id="descricao"
                            value={descricao}
                            placeholder="Descricao"
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </div>

                    

                    <div className="form-group">
                        <label htmlFor="dataEntrega">Data Entrega</label>
                        <input className="form-control" type="text"
                            name="dataEntrega"
                            id="dataEntrega"
                            value={dataEntrega}
                            placeholder="Digite a data de Entrega"
                            onChange={e => setDataEntrega(e.target.value)}
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

export default CreateTarefas;