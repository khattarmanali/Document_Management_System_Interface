import API, { BASE_URL } from "./API";

export const searchFiles = async (token) => {
  try {
    const response = await API.post(
      `${BASE_URL}/searchDocumentEntry`,
      {
        major_head: "",
        minor_head: "",
        from_date: "",
        to_date: "",
        tags: [{ tag_name: "" }, { tag_name: "" }],
        uploaded_by: "",
      },
      {
        headers: {
          token: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
