import React, { useState, useEffect } from "react";
import UserForm, { FormData } from "../../components/UserForm";
import UserList from "../../components/UserList";
import { User } from "../../types/User";
import api from "../../services/api";
import "./style.css"

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    async function load() {
      const response = await api.get("/usuarios");
      setUsers(response.data);
    }
    load();
  }, []);

  async function handleCreate(data: FormData) {
    const response = await api.post("/usuarios", data);
    setUsers([...users, response.data]);
  }

  async function handleEdit(data: FormData) {
    if (!editing) return;

    const response = await api.patch(`/atualizar/${editing.id}`, data);

    setUsers(users.map(u =>
      u.id === editing.id ? response.data : u
    ));

    setEditing(null);
  }

  async function handleDelete(id: number) {
    await api.delete(`/deletar/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  }
  return (
    <div style={{ padding: "20px" }}>
      <UserForm
        onSubmit={editing ? handleEdit : handleCreate}
        editing={editing}
        cancelEdit={() => setEditing(null)}
      />

      <UserList
        users={users}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}
