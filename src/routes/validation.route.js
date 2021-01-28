const { Router } = require('express');
const validateReqBody = require('../middleware/validateRule');
const validateRouter = Router();

validateRouter.post('/', validateReqBody, (request, response) => {
  response.status(200).send({
    hi: 'hello',
  });
});
module.exports = validateRouter;
