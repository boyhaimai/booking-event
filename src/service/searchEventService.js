import * as request from "~/utill/httpRequest";

export const searchEventService = async (q, type = "event") => {
  try {
    const res = await request.get(`tickets/search`, {
      params: {
        q,
        type,
      },
    });

    console.log(res,'result res');
    return res;    
  } catch (err) {
    console.error("Error fetching", err);
    return { success: false, dataEvents: [] };
  }
};
