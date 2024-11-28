import * as request from "~/utill/httpRequest";

export const filterEventService = async (status) => {
  try {
    const res = await request.get(`tickets/ticket`, {
      params: {
        status,
      },
    });
    return res;
  } catch (err) {
    console.error("Error fetching events", err);
    return { success: false, dataEvents: [] };
  }
};
