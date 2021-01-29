const { Router } = require('express');
const { validateRule } = require('../controllers/validateRule.controller');
const validation = require('../middleware/validation');
const validateRouter = Router();

validateRouter.post('/', validation, validateRule);

module.exports = validateRouter;
