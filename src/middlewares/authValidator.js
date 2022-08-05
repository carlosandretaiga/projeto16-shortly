

import {loginSchema, userSchema} from "../schemas/authSchema";

export function validateLogin(req, res, next) {
  try {
    const login = req.body;
    const validation = loginSchema.validate(login, { abortEarly: false });
  
    if(validation.error) {
      return res.sendStatus(400); //bad request
    }
  
    next();
    
  } catch (error) {
    const errors = error.details.map(detail => detail.message);
    res.status(422).send(errors);
    
  }
}; 

export function validateUser(req, res, next) {
  try {
    const user = req.body;
    const validation = userSchema.validate(user, { abortEarly: false });

    if(validation.error) {
      return res.sendStatus(422);
    } 

    next();
  } catch (error) {
    const errors = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  }
}