const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const tokenModel = require("../models/token.model");
const authService = require("../services/auth.service");
const { validateRegister, validateLogin } = require("../validations/auth.validation");

const SALT_ROUNDS = 10;

// POST /auth/register
exports.register = async (req, res) => {
  const errors = validateRegister(req.body);
  if (errors.length > 0) {
    return res.status(400).send({ message: "Validation failed", errors });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).send({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await userModel.createUser({ name, email, hashedPassword });

    res.status(201).send({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong during registration" });
  }
};

// POST /auth/login
exports.login = async (req, res) => {
  const errors = validateLogin(req.body);
  if (errors.length > 0) {
    return res.status(400).send({ message: "Validation failed", errors });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await tokenModel.saveRefreshToken(user.id, refreshToken, expiresAt);

    res.send({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong during login" });
  }
};

// POST /auth/refresh
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).send({ message: "Refresh token is required" });
  }

  try {
    const storedToken = await tokenModel.findRefreshToken(refreshToken);
    if (!storedToken) {
      return res.status(403).send({ message: "Refresh token not recognized" });
    }

    const decoded = authService.verifyRefreshToken(refreshToken);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(403).send({ message: "User no longer exists" });
    }

    const newAccessToken = authService.generateAccessToken(user);

    res.send({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(403).send({ message: "Invalid or expired refresh token" });
  }
};

// POST /auth/logout
exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send({ message: "Refresh token is required" });
  }

  try {
    await tokenModel.deleteRefreshToken(refreshToken);
    res.send({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong during logout" });
  }
};