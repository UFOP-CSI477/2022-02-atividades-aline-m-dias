import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../services/api";

import 'bootstrap/dist/css/bootstrap.min.css';

export interface AlunoInterface {
   
    id: number;             
    nome:String;
    matricula: String;
    dataNascimento: String;
    email: String;
    endereco: String;
    turma_id:String;
    created_at: string;
    updated_at: string;
    
}

const ListAlunos = () => {

    const [ alunos, setAlunos ] = useState<AlunoInterface[]>([]);  
    
    useEffect(() =>{

        api.get('/alunos')
            .then(response => {
                console.log(response.data);
                setAlunos(response.data);
            })

    }, [])

    const handleDeletealuno = async (id: number) => {

        // Validações
        if ( !window.confirm( "Confirma exclusão do aluno?" ) ) {
            return
        }

        try {
            await api.delete('/alunos', 
            {
                data: {
                    id
                }
            });

            alert("aluno excluído com sucesso!");

            // // Atualizar?
            // setalunos( alunos.filter(aluno => aluno.id != id) );

        } catch(error) {
            alert("Erro na exclusão do aluno!");
            console.error(error);
        }

    }


    return(

        <div className="container">

            <div className="h-10 p-5 b">
                <h1>Lista de Alunos</h1>

             </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/">Voltar</Link>
            </div>

            <div className="btn btn-outline-primary px-10 me-3">
                <Link to="/alunos/create">Inserir Aluno</Link>
            </div>

            <table className="table">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Data de Nascimento</th>
                        <th>Endereco</th>
                        <th>Turma</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                
                <tbody>
                    {alunos.map(aluno=> (
                        <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.dataNascimento}</td>
                            <td>{aluno.endereco}</td>
                            <td>{aluno.turma_id}</td>
                            <td>{aluno.created_at}</td>
                            <td>{aluno.updated_at}</td>
                            <td className= "btn btn-primary"><Link 
                                to={`/alunos/update/${aluno.id}`}>Atualizar</Link></td>
                            <td ><button  className= "btn btn-danger "  onClick={()=>{ 
                                handleDeletealuno(aluno.id)
                             }}>Excluir</button> </td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </div>

    )

}

export default ListAlunos;