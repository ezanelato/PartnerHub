// ====== import ======
import { Link } from 'react-router-dom'; // Semelhante ao href

// ====== Funcão para utilizacão de elementos HTML ======
// link faz a funcao do href mas sem recarregar para nao perder o State do React
export function AdminNavbar() {
    return (
        <nav className="admin-navbar">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/links">Links</Link>
        <Link to="/admin/usuarios">Usuários</Link>
        <Link to="/admin/leads">Leads</Link>
      </nav>
    );
}