import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../services/api";

import 'bootstrap/dist/css/bootstrap.min.css';

export interface TarefasInterface {
   
    id: number;    
    descricao: String;
    dataEntrega: String;    
    turma_id: String;     
    aluno_id: String;
}

const ListTarefas = () => {

    const [ tarefa, setTarefas ] = useState<TarefasInterface[]>([]);  
    // const [ professor, setProfessores ] = useState<TarefasInterface[]>([]);  
    
    
    useEffect(() =>{

        api.get('/tarefas')
            .then(response => {
                console.log(response.data);
                setTarefas(response.data);
            })

        // api.get('/professores')
        //     .then(response => {
        //         console.log(response.data);
        //         setProfessores(response.data);
        //     })

    }, [])

    const handleDeleteTarefa = async (id: number) => {

        // Validações
        if ( !window.confirm( "Confirma exclusão da tarefa?" ) ) {
            return
        }

        try {
            await api.delete('/tarefas', 
            {
                data: {
                    id
                }
            });

            alert("Tarefa excluída com sucesso!");

            // // Atualizar?
            // setalunos( alunos.filter(diciplina => diciplina.id != id) );

        } catch(error) {
            alert("Erro na exclusão da Tarefa!");
            console.error(error);
        }

    }


    return(

        <div className="container">

            <div className="h-10 p-5 b">
                <h1>Lista de Tarefas</h1>

             </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/">Voltar</Link>
            </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/tarefas/create">Inserir Tarefa</Link>
            </div>

            <table className="table">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descrição</th>
                        <th>Data Entrega</th>
                        <th>Turma ID</th>
                        <th>Aluno ID</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                
                <tbody>
                    {tarefa.map(tarefa=> (
                        <tr key={tarefa.id}>
                            <td>{tarefa.id}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.dataEntrega}</td>
                            <td>{tarefa.turma_id}</td>
                            <td>{tarefa.aluno_id}</td>
                            <td className= "btn btn-primary"><Link 
                                to={`/tarefas/update/${tarefa.id}`}>Atualizar</Link></td>
                            <td ><button  className= "btn btn-danger "  onClick={()=>{ 
                                handleDeleteTarefa(tarefa.id)
                             }}>Excluir</button> </td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </div>

    )

}

export default ListTarefas;