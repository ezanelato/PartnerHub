// ====== Import ======
import { useState, useEffect } from "react";
import type { User } from "../types/User";
import type { Partner } from "../types/Partner";
import { addUser, getUsers } from "../services/userService";
import { AdminUserForm } from "../components/AdminUserForm";
import { addPartner } from "../services/partnerService";
import { Modal } from "../components/Modal";

// ====== Funcao para usar elementos html ======
export function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    getUsers().then((dados) => setUsers(dados));
  }, []);

  // ===== Funcao para cadastro de novos Users ======
  async function handleCreate(user: User, partner: Partner | null) {
    try {
      const criado = await addUser(user);
      setUsers((atual) => [...atual, criado]);

      if (partner) {
        await addPartner({
          ...partner,
          id: criado.id, // id real vindo do backend
        });
      }

      setModalAberto(false);
    } catch (err) {
      console.error("Erro ao criar usuário/parceiro:", err);
    }
  }

  return (
    <div className="admin-users">
      <h1>Usuários</h1>

      <button onClick={() => setModalAberto(true)}>Adicionar usuário</button>

      <Modal open={modalAberto} onClose={() => setModalAberto(false)}>
        <AdminUserForm onCreate={handleCreate} />
      </Modal>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.nome}</span>
            <span>{user.email}</span>
            <span className="role-badge">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}