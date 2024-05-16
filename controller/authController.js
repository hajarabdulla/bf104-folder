const User = require("../model/user");
const jwt = require("jsonwebtoken");

//! Add New User
const AddUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = new User({
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    user.save();
    res.status(201).json({ message: "success", data: user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//! Get All Users
const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//! Get User By Id
const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//! Delete User
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//! Update User
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, age } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        surname,
        age,
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const pw = await user.checkPassword(password);

  res.json({ user , pw});
};

module.exports = {
  AddUser,
  GetUsers,
  GetUserById,
  DeleteUser,
  UpdateUser,
  login,
};
