const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


const { User } = require("../models/user.model");
const { Product } = require("../models/products.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util"); 
const { Email } = require("../utils/email.util");
const { Order } = require("../models/orders.model");

dotenv.config({ path: "./config.env" });


const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return next(new AppError("Invalid role", 400));
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  newUser.password = undefined;

	await new Email(email).sendWelcome(username);
  
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

const login = catchAsync(async (req, res, next) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: "active" },
  });


  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials", 400));
  }

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const getUserProducts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const productUser = await Product.findAll({
    where: { userId: sessionUser.id },
  });

  res.status(200).json({
    data: productUser,
  });
});

const getOrdersUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const allOrders = await Order.findAll({ where: { userId: sessionUser.id } });
  res.status(200).json({
    status: "Success",
    data: allOrders,
  });
});

const getOrdersUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const{sessionUser}=req
  const order = await Order.findOne({ where: { id } });

  if(!(order.userId===sessionUser.id)) new AppError("You are not the owner of the order", 403)
  
  res.status(200).json({
    status: "Success",
    data: order,
  });
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  getUserProducts,
  getOrdersUser,
  getOrdersUserById,
};
