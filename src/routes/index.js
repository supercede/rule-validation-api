const { Router } = require('express');
const validateRoutes = require('./validation.route');

const router = Router();
router.use('/validate-rule', validateRoutes);

module.exports = router;
