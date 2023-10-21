const express = require('express');
const router = express.Router();
const tableController = require("../controllers/tableController")

router.post('/createtable', tableController.createTable);

module.exports = router;