const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
    const { name, email, profileImage, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "please check some missing feild"
            })
        };

        const existingUser = await User.findOne({ email });

        console.log("exisiting userInfo : " , existingUser);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
                name, email, profileImage, password: hashedPassword
            });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '90d' });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "User not found"
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({
                success: false,
                error: "Invalid password"
            });
        }


        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '90d' });

        res.status(201).json({
            success: true,
            message: "User logined successfully",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
