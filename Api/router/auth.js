import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: await bcrypt.hash(password, 10)
        });
        console.log("Created")
        res.status(201).json(await user.save());
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email: email});
        const isMatch = await bcrypt.compare(password, user.password);

        if(user && isMatch){
            console.log("logged in")
            jwt.sign({email: email, id: user._id}, process.env.JWT_KEY, { expiresIn: '1h'}, (err, token) => {
                if(err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error")
                }
                res.cookie('token', token).status(200).send("Logged In")
            })
        } else {
            res.status(401).send("Invalid")
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

export default router;