import { User } from "../../types/User";
import React, { useState, useEffect } from "react";
import "./style.css";


export type FormData = Omit<User, "id">;

type Props = {
  onSubmit: (data: FormData) => Promise<void> | void;
  editing: User | null;
  cancelEdit: () => void;
};

export default function UserForm({ onSubmit, editing, cancelEdit }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editing) {
      setNome(editing.nome);
      setIdade(editing.idade.toString());
      setEmail(editing.email);
    } else {
      setNome("");
      setIdade("");
      setEmail("");
    }
  }, [editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ nome, idade: Number(idade), email });

    if (!editing) {
      setNome("");
      setIdade("");
      setEmail("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? "Editar Usuário" : "Cadastrar Usuário"}</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        {editing ? "Salvar alterações" : "Cadastrar"}
      </button>

      {editing && (
        <button type="button" onClick={cancelEdit}>
          Cancelar
        </button>
      )}
    </form>
  );
}
