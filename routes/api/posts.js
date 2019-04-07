const express = require('express');
const router = express.Router(); 

// @route   api/posts/test
// @desc    test posts route
// @access   public 
router.get('/test',(req,res)=>res.json({msg: 'posts  works'}))

module.exports = router; 