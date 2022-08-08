import urlSchema from "../schemas/urlSchema.js";

export function validateUrl (req, res, next) {
  try {
    const url = req.body;
    const validation = urlSchema.validate(url, { abortEarly: false });

    if(validation.error) {
      return res.sendStatus(422);
    } 

    next();
  } catch (error) {
    res.status(422).send(error); 
  }
}