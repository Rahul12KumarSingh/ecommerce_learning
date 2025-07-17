const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const isAdmin = require('../middleware/isAdmin');

const route = express.Router() ;

const {getPresignedUrl} = require('../controller/cloudController') ;

route.post('/getSignedUrl'   , getPresignedUrl) ;

module.exports = route ;