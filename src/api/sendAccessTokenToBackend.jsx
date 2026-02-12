import axios from "axios";

const sendAccessTokenToBackend = async(idToken) => {
    try{
        console.log("실제 요청 주소:", `${process.env.REACT_APP_HOST_URL}/사용중인경로`);
        
        const response = await axios.post(`${process.env.REACT_APP_HOST_URL}/auth/google`,
            {idToken: idToken},
            {withCredentials: true}
        );

        console.log("백엔드 로그인 성공: ", response.data);

        return response.data;

    } catch(error) {
        console.error("로그인 실패:", error);
        throw error;
    }
};

export default sendAccessTokenToBackend;