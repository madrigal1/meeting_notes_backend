import Joi from "joi";



export default {
    "new": Joi.object().keys({
        "title": Joi.string().required(),
        "desc": Joi.string().required(),
        "start_time": Joi.string().required(),
        "end_time": Joi.string().required(),
        "initiator": Joi.string().required(),
    }),
    "update": Joi.object().keys({
        "_id": Joi.string().required(),
        "title": Joi.string(),
        "desc": Joi.string(),
        "start_time": Joi.string(),
        "end_time": Joi.string(),
        "initiator": Joi.string(),
    }),
    "id": Joi.object().keys({
        "id": Joi.string().required(),
    })
}