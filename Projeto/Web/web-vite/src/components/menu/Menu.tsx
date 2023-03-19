import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




const Menu = () => {

  return(
      <div>
          <h2>Sistema de controle de Tarefas</h2>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/alunos">Alunos</Link></li>
              <li><Link to="/professores">Professores</Link></li>
              <li><Link to="/disciplinas">Disciplinas</Link></li>
              <li><Link to="/tarefas">Tarefas</Link></li>
              <li><Link to="/entregas">Entregas</Link></li>
          </ul>
      </div>
  );

}

export default Menu;
