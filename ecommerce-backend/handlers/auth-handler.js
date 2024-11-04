const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    let newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashPassword,
    });
    await newUser.save();
    return newUser;
}

async function loginUser(userData) {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        return { error: "User not found" };
    }
    const isMatched = await bcrypt.compare(userData.password, user.password);
    if (!isMatched) {
        return { error: "Incorrect password" };
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, "secret", {
        expiresIn: "1h"
    });

    return { token, user }
}

module.exports = { registerUser, loginUser }