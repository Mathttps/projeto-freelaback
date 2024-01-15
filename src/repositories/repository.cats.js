import { db } from "../database/dbconnection.js";

export async function getCatss(userId) {
  return db.query("SELECT * FROM gatos WHERE idtutor=$1 ORDER BY id;", [userId]);
}

export async function insertCat(nome, idade, genero, userId, fotoperfil) {
  try {
    await db.query(`
      INSERT INTO gatos (nome, idade, genero, idtutor, fotoperfil)
      VALUES ($1, $2, $3, $4, $5)
    `, [nome, idade, genero, userId, fotoperfil]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCatsTv() {
  return db.query("SELECT * FROM gatos WHERE disponibilidade=true ORDER BY id;");
}






