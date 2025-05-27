import validator from 'validator';
import userModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
   try {
    
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if(!user){
        return res.json({success:false,message:"User doesn't exists"})

    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        const token = createToken(user._id);
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"invalid credentials"})
    }
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.messagen})
   }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (!validator.isStrongPassword(password, { minLength: 8 })) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const adminLogin = async (req, res) => {
   try {
     const { email, password } = req.body;
     if(email===process.env.ADMIN_EMAIL&& password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.json({success:true,token})
     }else{
        res.json({success:false,message:"Invalid  email or password"})
     }
   } catch (error) {
    console.log(error);
        res.json({ success: false, message: error.message });
   }
};

export { loginUser, registerUser, adminLogin };

