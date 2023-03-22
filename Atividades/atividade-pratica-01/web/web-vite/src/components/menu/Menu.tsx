import { Link } from 'react-router-dom';
import './menu.css'

const Menu = () => {

    return(
        <div className="Menu">
            <h2>Sistema de Doação de Sangue</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/estados">Estados</Link></li>
                <li><Link to="/cidades">Cidades</Link></li>
                <li><Link to="/doacoes">Doações</Link></li>
                <li><Link to="/pessoas">Pessoas</Link></li>
                <li><Link to="/estados">Locais Coleta</Link></li>
                <li><Link to="/tipoSanguineo">TipoSanguineo</Link></li>
            </ul>
        </div>
    );

}

export default Menu;