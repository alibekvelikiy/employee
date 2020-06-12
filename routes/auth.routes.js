const {Router} = require("express")
const User = require("../models/User")
const config = require("config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const router = Router()

router.post("/register",
    [
        check("email", "Email is not valid").normalizeEmail().isEmail(),
        check("password", "Password length should be min 6 symbols")
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid register data"
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "Email's already registered"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: "User's been created"})

        } catch (e) {
            res.status(500).json({message: "Something went wrong. Please, try again"})
        }
    })

router.post(
    "/login",
    [
        check("email", "Incorrect email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid register data"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: "Email is not found"})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Password does not match"})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )
            res.json({userId: user.id, token})

        } catch (e) {
            res.status(500).json({message: "Something went wrong. Please, try again"})
        }
    })

module.exports = router