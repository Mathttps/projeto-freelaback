import { getCatsTv, getCatss, insertCat } from "../repositories/repository.cats.js";

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send(error.message);
};

const HTTP_STATUS = {
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
};

export async function getMyCats(req, res) {
    const { userId } = res.locals;
    try {
        const gatos = await getCatss(userId);
        res.send(gatos.rows);
    } catch (error) {
        handleError(res, error);
    }
}

export async function postCats(req, res) {
    const { userId } = res.locals;
    const { nome, idade, genero, fotoperfil } = req.body;
    try {
        await insertCat(nome, idade, genero, userId, fotoperfil);
        res.sendStatus(HTTP_STATUS.OK);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getCatsa(req, res) {
    try {
        const gatos = await getCatsTv();
        res.send(gatos.rows);
    } catch (error) {
        handleError(res, error);
    }
}


