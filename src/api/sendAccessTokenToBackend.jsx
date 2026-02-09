import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_HOST_URL}/auth/google`, {code}
        );

        console.log({code});
        console.log("로그인 성공 with 서버", response);

        //토큰 저장(백엔드가 token을 반환하는 경우)
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            console.log("토큰저장완료");

        }
        console.log(response.data.token);

        //사용자 정보 저장
        if (response.data.user) {
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            console.log("사용자 정보 저장 완료");
        }

        return response.data;

    } catch (error) {
        console.log("로그인 실패:", error);
    }
};

export default sendAccessTokenToBackend;