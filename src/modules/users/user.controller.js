import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('../../../config/.env') });

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../../db/models/user.model.js';
import AppError from "../../../utils/AppError.js";
import { asyncHandling } from "../../../utils/errorHandling.js";


//================================signUp=================================================

export const register = asyncHandling(async (req, res, next) => {
    const { firstname, lastname, email, password, cpassword, DOB,
        mobileNumber, recoveryEmail, role, address } = req.body;

    // Ensure password and confirm password match
    (password !== cpassword) && next(new AppError('Passwords do not match', 400));

    // Check if the user already exists
    await userModel.findOne({ email: email.toLowerCase() })
        && next(new AppError('Email is already in Use', 409));

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create new user
    const user = new userModel({
        firstname, lastname, email, password: hashedPassword, DOB, mobileNumber, recoveryEmail, role, address
    });

    const newUser = await user.save();
    if (!newUser) return next(new AppError('User could not be created', 400));

    res.status(201).json({ msg: 'Signed up successfully', user: {name:newUser.firstname,email:newUser.email,mobileNumber:newUser.mobileNumber} });
});

export const login = asyncHandling(async (req, res, next) => {
    const { email, password } = req.body;

    // Find user by email and confirmed account
    const user = await userModel.findOne({ email, confirmed: true });

    // Check if user exists
    if (!user) return next(new AppError('User not found or account is not confirmed yet', 400));

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return next(new AppError('Invalid credentials', 401));

    // Create JWT token with expiration
    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '6h' } // Token expiration, e.g., '1h'
    );

    // Update user status to online
    await userModel.updateOne({ email }, { loggedIn: true });

    // Send response
    res.status(200).json({ message: 'User signed in successfully', token });
});