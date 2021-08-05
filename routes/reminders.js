const router = require("express").Router();
const controller = require("../controllers/reminders");

router.post("/", controller.create);
router.get("/", controller.listProduct);
router.get("/:id", controller.getReminders);

router.put("/:id", controller.putProduct);
router.delete("/:id", controller.putProduct);
router.patch("/:id", controller.putProduct);

module.exports = router;
