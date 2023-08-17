const Joi = require('joi');
const validate = require('../standard');

const validateCreatePost = (obj) => {
    const JoiSchemaBody = Joi.object({
        food_name: validate.food_name.required(),
        description: validate.description.required()
    });
    const { error } = JoiSchemaBody.validate(obj);
    if (error) return error.details[0].message;
};

const validateEditPost = (obj) => {
    const JoiSchemaBody = Joi.object({
        id: validate.id.required(),
        food_name: validate.food_name.required(),
        description: validate.description.required()
    });
    const { error } = JoiSchemaBody.validate(obj);
    if (error) return error.details[0].message;
}

const validateDeletePost = (obj) => {
    const JoiSchemaBody = Joi.object({
        id: validate.id.required()
    });
    const { error } = JoiSchemaBody.validate(obj);
    if (error) return error.details[0].message;
}

module.exports = {
    validateCreatePost,
    validateEditPost,
    validateDeletePost
}