import { User } from "../../types/User";
import UserCard from "../UserCard";
import "./style.css";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, onEdit, onDelete }: Props) {
  return (
    <div className="user-list">
      {users.map((u) => (
        <UserCard
          key={u.id}
          user={u}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
