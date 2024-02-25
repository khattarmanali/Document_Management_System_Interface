import API, { BASE_URL } from "./API";

export const generateOtp = async (phone) => {
  console.log(BASE_URL, "phone");
  try {
    const response = await API.post(`${BASE_URL}/generateOTP`, {
      mobile_number: phone,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await API.post(`${BASE_URL}/validateOTP`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
