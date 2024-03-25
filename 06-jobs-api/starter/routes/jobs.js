const express = require('express');
const router = express.Router();
const {getalljobs,getjob,createjob,updatejob,deletejob}= require('../controllers/jobs')
router.route('/').get(getalljobs).post(createjob)
router.route('/:id').get(getjob).delete(deletejob).patch(updatejob)
module.exports = router;
