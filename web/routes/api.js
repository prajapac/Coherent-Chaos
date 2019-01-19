const express = require('express');

const router = express.Router();

// API root
router.get('/', (req, res) => {
    res.json({success: true});
});

// Example sub route
router.get('/test', function (req, res) {
    res.json({success: true});
});

module.exports = router;
