import joi from 'joi';

//VALIDATION
const loginValidation = (data) => {
  const schema = {
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(data, schema);
};

export default loginValidation;
