import loginSchema from "../schemas/loginSchema.js";
import userSchema from "../schemas/userSchema.js";


export function validateLogin(req, res, next) {
  try {
    const login = req.body;
    const validation = loginSchema.validate(login, { abortEarly: false });
  
    if(validation.error) {
      return res.sendStatus(400); //bad request
    }
  
    next();
    
  } catch (error) {
    res.status(422).send(error);  
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
    res.status(422).send(error); 
  }
}