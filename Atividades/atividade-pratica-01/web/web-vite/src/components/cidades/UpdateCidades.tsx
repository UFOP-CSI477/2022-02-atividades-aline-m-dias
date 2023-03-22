import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateCidades  = () => {

    const [nome, setNome] = useState('');
    const [estado_id, setEstadoId] = useState('');
 
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/cidades/${id}`)
          .then(response => {
            setNome(response.data.nome);
            setEstadoId(response.data.estado_id);
            
            api.get(`/estados/${response.data.estado_id}`)
              .then(responseEstado => {
                setEstadoId(responseEstado.data.nome);
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(error => {
            console.error(error);
          });
      }, [id]);

    const handleUpdateCidade = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
    
        const data = {
            id : parseInt(String(id)),
            nome,
            estado_id
        }

        try {
            
            await api.put('/cidades', data);
            alert('Cidade atualizada com sucesso');
            navigate('/cidades');

        } catch (error) {
            alert('Erro ao atualizar a Cidade!');
            console.error(error);
        }

    }


    return(

        <div>
            <h3>Cadastro de cidades: {nome}-{estado_id}</h3>

            <form onSubmit={handleUpdateCidade}>

                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        placeholder="Nome da Cidade"
                        onChange={e => setNome(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="estado_id">Estado </label>
                    <input type="text"
                        name="estado_id"
                        id="estado_id"
                        value={estado_id}
                        placeholder="Nome do estado"
                        onChange={e => setEstadoId(e.target.value)}
                    />
                </div>

                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
                <Link to="/">Voltar</Link>
            </form>
        </div>

    );



}

export default UpdateCidades ;