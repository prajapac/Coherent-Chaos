const express = require('express');
const path = require('path');

const router = express.Router();

// Serve 404 page
router.use((req, res) => {
    res.status(404);
    res.sendFile(path.resolve('public/404.html'));
});

module.exports = router;
