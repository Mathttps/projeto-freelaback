import { db } from "../database/dbconnection.js";

export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const sessao = await db.query("SELECT * FROM sessions WHERE token=$1;", [token]);

    if (sessao.rowCount === 0 || !sessao.rows[0]?.idusuario) {
      return res.sendStatus(401);
    }

    res.locals.userId = sessao.rows[0].idusuario;
    next();
  } catch (error) {
    handleServerError(res, error);
  }
}

function handleServerError(res, error) {
  console.error(error);
  res.status(500).send(error.message);
}
