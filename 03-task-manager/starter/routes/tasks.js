const express = require('express');
const router = express.Router();
const {getalltask,deltask,updatetask,gettask,creattask} = require('../controllers/tasks');
router.route('/').get(getalltask).post(creattask);
router.route('/:id').patch(updatetask).delete(deltask).get(gettask);

module.exports = router;