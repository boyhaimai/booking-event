import * as request from "~/utill/httpRequest";

export const registerUser = async (
  userId,
  userName,
  email,
  password,
  products
) => {
  try {
    const res = await request.post("users/register", {
      userId,
      userName,
      email,
      password,
      products,
    });
    if (res && res.success) {
      console.log(res, "user created");

      return res;
    } else {
      return {
        success: false,
        message: res?.message || " Đã xảy ra lỗi trong quá trình đăng ký.",
      };
    }
  } catch (err) {
    console.error(err, "Error in registerUserService");
    return {
      success: false,
      message: "Đã xảy ra loi trong quá trình đăng ký.",
    };
  }
};
