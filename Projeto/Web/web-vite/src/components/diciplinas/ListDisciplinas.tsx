import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../services/api";

import 'bootstrap/dist/css/bootstrap.min.css';

import { ProfessorInterface } from "../professores/ListProfessores";

export interface DisciplinasInterface {
   
    id: number;             
    nome:String;
    cargaHoraria: String;
    Universidade: String;
    professor_id: String;
    tarefa_id: String;
    // professor: ProfessorInterface;
}

const ListDisciplinas = () => {

    const [ disciplinas, setDisciplinas ] = useState<DisciplinasInterface[]>([]);  
    // const [ professor, setProfessores ] = useState<DisciplinasInterface[]>([]);  
    
    
    useEffect(() =>{

        api.get('/disciplinas')
            .then(response => {
                console.log(response.data);
                setDisciplinas(response.data);
            })

        // api.get('/professores')
        //     .then(response => {
        //         console.log(response.data);
        //         setProfessores(response.data);
        //     })

    }, [])

    const handleDeleteDisciplina = async (id: number) => {

        // Validações
        if ( !window.confirm( "Confirma exclusão da diciplina?" ) ) {
            return
        }

        try {
            await api.delete('/disciplinas', 
            {
                data: {
                    id
                }
            });

            alert("Disciplina excluída com sucesso!");

            // // Atualizar?
            // setalunos( alunos.filter(diciplina => diciplina.id != id) );

        } catch(error) {
            alert("Erro na exclusão da Disciplina!");
            console.error(error);
        }

    }


    return(

        <div className="container">

            <div className="h-10 p-5 b">
                <h1>Lista de Disciplinas</h1>

             </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/">Voltar</Link>
            </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/disciplinas/create">Inserir Disciplinas</Link>
            </div>

            <table className="table">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Carga Horária</th>
                        <th>Universidade</th>
                        <th>Professor</th>
                        <th>Tarefa</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                
                <tbody>
                    {disciplinas.map(diciplina=> (
                        <tr key={diciplina.id}>
                            <td>{diciplina.id}</td>
                            <td>{diciplina.nome}</td>
                            <td>{diciplina.cargaHoraria}</td>
                            <td>{diciplina.Universidade}</td>
                            <td>{diciplina.professor_id}</td>
                            <td>{diciplina.tarefa_id}</td>
                            <td className= "btn btn-primary"><Link 
                                to={`/disciplinas/update/${diciplina.id}`}>Atualizar</Link></td>
                            <td ><button  className= "btn btn-danger "  onClick={()=>{ 
                                handleDeleteDisciplina(diciplina.id)
                             }}>Excluir</button> </td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </div>

    )

}

export default ListDisciplinas;