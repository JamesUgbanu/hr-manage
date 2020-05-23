import joi from 'joi';

const Validation = {};
//VALIDATION
const registerValidation = (data) => {
  const schema = {
    first_name: joi.string().min(3).required(),
    last_name: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    is_admin: joi.boolean().required(),
  };
  return joi.validate(data, schema);
};

export default registerValidation;
//is_admin: joi.boolean().invalid(false),
