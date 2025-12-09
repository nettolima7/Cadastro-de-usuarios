import { User } from "../../types/User";
import "./style.css";

interface Props {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <div className="user-card">
      <div className="user-info">
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Idade:</strong> {user.idade}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="user-actions">
        <button className="btn-edit" onClick={() => onEdit(user)}>
          Editar
        </button>

        <button className="btn-delete" onClick={() => onDelete(user.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}
