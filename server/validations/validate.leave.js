import joi from 'joi';

const leaveValidation = (data) => {
  const schema = {
    duration: joi.number().required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    leave_type: joi.string().min(6).required(),
    description: joi.string().min(6).required(),
  };
  return joi.validate(data, schema);
};

export default leaveValidation;
