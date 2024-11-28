import * as httpRequest from "~/utill/httpRequest";

export const storageTicket = async (userId, selectedDate) => {
  try {
    const res = await httpRequest.post("/tickets/paymented-ticket", {
      userId,
      selectedDate,
    });
    console.log(res, "storageTicket");
    
    return res;
  } catch (err) {
    console.error("Error storageTicket Service", err);
  }
};
