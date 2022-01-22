import Joi from "joi";

export default {
    "new": Joi.object().keys({
        "email": Joi.string().email().required(),
        "pwd": Joi.string().required(),
    }),
    "login": Joi.object().keys({
        "email": Joi.string().email().required(),
        "pwd": Joi.string().required(),
    })
}