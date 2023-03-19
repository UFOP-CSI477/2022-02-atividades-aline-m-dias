import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../services/api";

import 'bootstrap/dist/css/bootstrap.min.css';

export interface ProfessorInterface {
   
    id: number;             
    nome:String;
    email: String;
}

const ListProfessores = () => {

    const [ professores, setProfessores ] = useState<ProfessorInterface[]>([]);  
    
    useEffect(() =>{

        api.get('/professores')
            .then(response => {
                console.log(response.data);
                setProfessores(response.data);
            })

    }, [])

    const handleDeleteProfessor = async (id: number) => {

        // Validações
        if ( !window.confirm( "Confirma exclusão do professor?" ) ) {
            return
        }

        try {
            await api.delete('/professores', 
            {
                data: {
                    id
                }
            });

            alert("professor excluído com sucesso!");

            // // Atualizar?
            // setalunos( alunos.filter(professor => professor.id != id) );

        } catch(error) {
            alert("Erro na exclusão do professor!");
            console.error(error);
        }

    }


    return(

        <div className="container">

            <div className="h-10 p-5 b">
                <h1>Lista de Professores</h1>

             </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/">Voltar</Link>
            </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/professores/create">Inserir Professor</Link>
            </div>

            <table className="table">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                
                <tbody>
                    {professores.map(professor=> (
                        <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.nome}</td>
                            <td>{professor.email}</td>
                            <td className= "btn btn-primary"><Link 
                                to={`/professores/update/${professor.id}`}>Atualizar</Link></td>
                            <td ><button  className= "btn btn-danger "  onClick={()=>{ 
                                handleDeleteProfessor(professor.id)
                             }}>Excluir</button> </td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </div>

    )

}

export default ListProfessores;