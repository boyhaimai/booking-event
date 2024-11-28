import * as request from "~/utill/httpRequest";

export const paymentRequest = async (paymentData) => {
  try {
    const res = await request.post("tickets/payments", paymentData);
    console.log(res,'response service');
    return res;
  } catch (err) {
    console.error(err, "Error creating payment");
    throw err;
  }
};
