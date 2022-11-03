
const router = require("express").Router();
const registrer = require("../controllers/lo");
router.post("/lol", registrer.fn);
module.exports = router;
