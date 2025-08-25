const userschema=require("../models/userschema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const signup =async (req,res)=>{
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const existing = await userschema.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const profile = req.file ? req.file.filename : null;

        const user = await userschema.create({ username, email, password: hashPassword, role, profile });
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userschema.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15d" });

        res.json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getprofile = (req,res)=>{
    res.json({ user: req.user });
}

 
module.exports={signup,login,getprofile}