const User = require('../models/user'); // Assuming you have a User model defined

const isAdmin = async (req, res, next) => {
    // debugger;
    console.log("req.use info : ", req.user);

    const userInfo = await User.findOne({ email: req.user.email });
    console.log("user Info :  ", userInfo);


    if (userInfo && userInfo.role == 1) {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: "you are not a admin..."
        })
    }
}


module.exports = isAdmin;