import axios from "axios";

const sendAccessTokenToBackend = async (idToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/auth/google`,
      { idToken: idToken },
      { withCredentials: true }
    );

    const data = response.data;

    const userId =
      data?.userId ??
      data?.id ??
      data?.user?.id ??
      data?.data?.userId ??
      data?.data?.id ??
      null;

    if (userId !== null && userId !== undefined) {
      sessionStorage.setItem("userId", String(userId));
    }

    return data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
