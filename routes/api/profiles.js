const express = require('express');
const router = express.Router();
const passport = require('passport');

const profile = require('../../model/profile');

router.get('/test', (req, res) => {
  res.json({
    success: true
  })
})



module.exports = router