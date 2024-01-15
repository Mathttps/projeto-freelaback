import { db } from "../database/dbconnection.js";

export async function getUsersByEmail(email) {
  return db.query("SELECT * FROM users WHERE email=$1", [email]);
}

export async function insertSession(token, id) {
  return db.query("INSERT INTO sessions (token, idusuario) VALUES ($1, $2)", [token, id]);
}

export async function getUsers(cpf, email) {
  return db.query("SELECT * FROM users WHERE email=$1 OR cpf=$2", [email, cpf]);
}

export async function insertUser(nome, email, password, cpf, telefone) {
  return db.query(
    "INSERT INTO users (nome, email, password, cpf, telefone) VALUES ($1, $2, $3, $4, $5)",
    [nome, email, password, cpf, telefone]
  );
}


