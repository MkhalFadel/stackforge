const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
   try {
      const { email, password } =
         req.body;

      const hashedPassword =
         await bcrypt.hash(password, 10);

      res.status(201).json({
         message: "User registered",
         user: {
            email,
            password: hashedPassword,
         },
      });

   } catch (err) {

      res.status(500).json({
         message: err.message,
      });
   }
};

exports.login = async (req, res) => {
   try {
      const { email } = req.body;

      const token = jwt.sign(
         { email },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         }
      );

      res.json({
         token,
      });

   } catch (err) {
      res.status(500).json({
         message: err.message,
      });
   }
};

exports.profile = async (req, res) => {
   res.json({user: req.user,});
};