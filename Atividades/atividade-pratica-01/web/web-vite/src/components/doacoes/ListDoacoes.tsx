import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../../css/list.css";

interface DoacoesInterface {
  id: number;
  pessoa_id: number;
  local_id: number;
}

const ListDoacoes = () => {
  const [doacoes, setDoacoes] = useState<DoacoesInterface[]>([]);

  useEffect(() => {
    api.get("/doacoes").then((response) => {
      console.log(response.data);
      setDoacoes(response.data);
    });
  }, []);

  const handleDeleteDoacoes = async (id: number) => {
    // Validações
    if (!window.confirm("Confirma exclusão da Doação?")) {
      return;
    }

    try {
      await api.delete(`/doacoes/${id}`);

      alert("Doação excluída com sucesso!");

      // Atualizar
      setDoacoes((doacoes) => doacoes.filter((doacao) => doacao.id !== id));
    } catch (error) {
      alert("Erro na exclusão da Doação!");
      console.error(error);
    }
  };

  return (
    <div className="List">
      <h2>Lista de Doações</h2>

      <div>
        <Link to="/">Voltar</Link>
      </div>
      <div>
        <Link to="/doacoes/create">Inserir Doação</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Pessoa</th>
            <th>Local</th>
            <th>Atualizar</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          {doacoes.map((doacao) => (
            <tr key={doacao.id}>
              <td>{doacao.id}</td>
              <td>{doacao.pessoa_id}</td>
              <td>{doacao.local_id}</td>

              <td>
                <Link to={`/doacoes/update/${doacao.id}`}>Atualizar</Link>
              </td>
              <td>
                <button onClick={() => handleDeleteDoacoes(doacao.id)}>
                  Excluir
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDoacoes;
