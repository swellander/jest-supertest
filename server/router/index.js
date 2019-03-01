const router = require("express").Router();

router.get("/products", (req, res, next) => {
  res.json([]);
});

module.exports = router;
