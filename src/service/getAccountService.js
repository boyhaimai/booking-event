import * as request from "~/utill/httpRequest";

export const getAccount = async (email, password )=>{
  try{
    const res = await request.post('users/login',{
      email,password
    })
    return res    
  }
  catch(err){
    console.error('Error login Service',err);
    return{
      success: false,
      message: 'Đã xảy ra lỗi trong quá trình đăng nhập.'
    }
  }
}