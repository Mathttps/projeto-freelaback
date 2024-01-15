import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getUsers, getUsersByEmail, insertSession, insertUser } from "../repositories/repository.auth.js";

const HTTP_STATUS = {
  CONFLICT: 409,
  CREATED: 201,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};


export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUsersByEmail(email);

    if (user.rowCount === 0) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
    }

    const token = uuid();
    await insertSession(token, user.rows[0].id);
    res.send({ token });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const signup = async (req, res) => {
  try {
    const { nome, email, password, cpf, telefone } = req.body;
    const existingUser = await getUsers(cpf, email);

    if (existingUser.rowCount !== 0) {
      return res.sendStatus(HTTP_STATUS.CONFLICT);
    }

    await insertUser(nome, email, await bcrypt.hash(password, 10), cpf, telefone);
    res.sendStatus(HTTP_STATUS.CREATED);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
