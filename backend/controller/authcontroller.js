const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
    try {
        const { name, email , profileImage , password } = req.body;
         
        if(!name || !email || !password) {  
            return res.status(400).json({
                success : false ,
                message : "please check some missing feild" 
            })
        } ;
        

        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.find({ email });

        if( existingUser) {
            return res.status(400).json({
                 success : false ,
                 message : "User already exists"
            });
        }

        
        const user = await User.create(
            {
             name, email , profileImage , password: hashedPassword
            });

            
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(401).json({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ user , token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
