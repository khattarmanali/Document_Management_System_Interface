import API, { BASE_URL, FORMDATA_API } from "./API";

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

export default async function fetchInputTags(token) {
  console.log("token", token);
  try {
    const response = await API.post(
      `${BASE_URL}/documentTags`,
      {
        term: "",
      },
      {
        headers: {
          token: token,
          content_type: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const uploadFile = async (file, token) => {
  try {
    const response = await API.post(`${BASE_URL}/saveDocumentEntry`, file, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
