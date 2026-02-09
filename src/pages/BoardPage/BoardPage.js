import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardTopSection from "./BoardTopSection";
import BoardOpinionSection from "./BoardOpinionSection";

function BoardPage() {
  return (
    <Wrapper>
      <TopArea>
        <BoardTopSection />
      </TopArea>

      <BottomArea>
        <BoardOpinionSection />
      </BottomArea>
    </Wrapper>
  );
}

export default BoardPage;