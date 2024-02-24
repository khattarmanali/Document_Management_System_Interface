import API from "./API";

export const generateOtp = async (phone) => {
  try {
    const response = await API.post("/auth/generateOTP", {
      mobile_number: phone,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
