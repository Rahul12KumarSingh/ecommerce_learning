const isAdmin = (req , res , next) => {
    try{
        if(req.user && req.user.role == 1){
            next();
        }

    }catch(err){
        
        res.status(403).json({
            error: "Access denied. You are not an admin."
        });
        
    }
}


module.exports = isAdmin;