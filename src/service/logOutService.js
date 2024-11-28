import * as request from "~/utill/httpRequest";

export const logOutFromServer = async (refreshToken) => {
    console.log("Đang gửi yêu cầu đăng xuất với refreshToken:", refreshToken); // Thêm log này
    try {
      const res = await request.post("users/logout", { refreshToken });
      console.log("Đăng xuất thành công từ server:", res);
      return res;
    } catch (err) {
      console.error("Lỗi khi đăng xuất từ server:", err);
      return {
        success: false,
        message: "Đã xảy ra lỗi khi đăng xuất.",
      };
    }
  };
  