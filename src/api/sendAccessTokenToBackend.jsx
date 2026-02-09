import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
    try {
        //백엔드로 보낼 것은 {code}임 
        const response = await axios.post(
            `${process.env.REACT_APP_HOST_URL}/auth/google`, {code}
        );

        console.log({code});
        console.log("로그인 성공 with 서버", response);

        //A. 토큰 저장(백엔드가 token을 반환하는 경우)
        if (response.data.token) {
            //로컬스토리지에 저장하는 명령어  setItem
            localStorage.setItem("token", response.data.token);
            console.log("token 저장 완료");

        }
        console.log(response.data.token);

        //B. memberID 저장 (백엔드가 memberId를 반환하는 경우)
        if(response.data.memberId){
            //로컬스토리지에 저장하는 명령어 
            localStorage.setItem("memberId", response.data.memberId);
            console.log("memberId 저장 완료")
        }
        console.log(response.data.memberId);

        //B. 사용자 정보(user) 저장(선택사항)
        if (response.data.user) {
            //JSON.stringify() 객체를 문자열로 변환 (저장할 때)
            //로컬스토리지는 글자(string)만 저장할 수 있기 때문에 
            
            //JSON.parse() 문자열을 객체로 변환 (꺼내쓸 때)
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            console.log("사용자 정보 저장 완료");
        }

        return response.data;

    } catch (error) {
        console.log("로그인 실패:", error);
    }
};

export default sendAccessTokenToBackend;