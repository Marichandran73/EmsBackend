import User from "../models/user.js";
import bcrypt from "bcrypt";

export const ChangePassword = async (req, res) => {
  try {
    const { userId, OldPassword, NewPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(OldPassword, user.password); 
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong old password",
      });
    }


    const hashPassword = await bcrypt.hash(NewPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true } 
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
