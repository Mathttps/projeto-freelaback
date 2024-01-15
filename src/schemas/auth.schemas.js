import joi from "joi"

const stringRequired = joi.string().required();
const emailRequired = joi.string().email().required();
const passwordRequired = joi.string().min(3).required();

export const signUpSchema = joi.object({
    nome: stringRequired,
    email: emailRequired,
    password: passwordRequired,
    cpf: joi.string().length(14).required(),
    telefone: joi.string().length(15).required()
})

export const signInSchema = joi.object({
    email: emailRequired,
    password: passwordRequired,
})