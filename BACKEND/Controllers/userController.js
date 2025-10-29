const User=require("../Models/userModel");
const bcrypt=require("bcrypt");
const validator=require("validator")
require('dotenv').config();
const jwt=require("jsonwebtoken");
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = createToken(newUser._id);
    return res.json({ success: true, token, id: newUser._id });

  } catch (error) {
    console.error("Register error:", error);
    return res.json({ success: false, message: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }
    
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ 
        success: true, 
        token, 
        id: user._id,
        name: user.name,
        email: user.email
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid admin credentials" 
      });
    }
    
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}