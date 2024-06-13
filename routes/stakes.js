const express = require("express");
const stakeController = require("../controllers/stakes");
const router = express.Router();

router.get('/', stakeController.getStakes);
router.get('/:id', stakeController.getStakeById);
router.post('/', stakeController.createStake);
router.patch('/:id', stakeController.updateStake);
router.delete('/:id', stakeController.deleteStake);

module.exports = router;