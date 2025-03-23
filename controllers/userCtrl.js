const userModel = require("../models/userModel");
const { hashPassword, comparePassword, generateToken } = require("../utils/utils");

const signup = async (req, res) => {
  try {
    const data = req.body;
    if (data.userRole === undefined) {
      data.userRole = 3;
    }
    data.password = await hashPassword(data.password);
    const user = new userModel(data);
    await user.save();
    res.status(201).json({ message: "User Added Successfully!", success: true });
  } catch (err) {
    console.log(err, "err in signup");
    if (err.errorResponse.errmsg.includes("duplicate key")) {
      res.status(400).json({ message: "Email Already Exists!", success: false });
    } else {
      res.status(500).json({ message: "Internal Server Error!", success: false });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).lean();
    if (user) {
      const isPasswordMatches = await comparePassword(password, user.password);
      if (isPasswordMatches) {
        const token = generateToken({ email, name: user.name, id: user._id, userRole: user.userRole });
        return res.status(200).json({
          message: "User Loggedin Successfully!",
          success: true,
          data: {
            name: user.name,
            email: user.email,
            _id: user._id,
            token,
          },
        });
      }
    }
    res.status(401).json({ message: "Incorrect Email or Password!", success: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

module.exports = { signup, login };

// HASHING ->

// password1234 => 983y2nj23n823h02ihr023nr0nf023 => 9293823nj2i3rb29r92fb9b#B(b)

// eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiSlJUUyJ9.eyJzdWIiOiAiMTIzNDU2Nzg5MCIsIm5hbWUiOiAiSm9obiBEb2UiLCJpYXQiOiAxNTE2MjM5MDIyfQ
//   .VIap2XxDZPQisJEd3hyYbqVXY5HMG9 -
//   ymS1aR0 -
//   X_kA;
