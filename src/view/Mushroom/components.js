import styled from "styled-components";

const themeColor = "#377dcd";
const borderColor = "#032875";
const contentHeight = "80vh";

export const Wrap = styled.div`
  width: 1440px;
  max-width: 100%;
  margin: 10px auto;
  padding: 0 10px;
  display: flex;
  box-sizing: border-box;
`;

export const LeftWrapper = styled.div`
  flex-shrink: 0;
  width: 420px;
  margin-right: 20px;
  color: ${themeColor};
  overflow-y: auto;
`;

export const RightWrapper = styled.div`
  flex: 1;
  color: ${themeColor};
`;

export const ContentBox = styled.div`
  height: ${contentHeight};
  overflow-y: auto;
`;

export const HeaderTitle = styled.h3`
  text-align: center;
  font-size: 20px;
`;

export const Accordion = styled.ul`
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;

  li {
    margin-bottom: 5px;
  }
`;

export const AccordionItemTitle = styled.p`
  margin: 0;
  text-align: center;
  background-color: #130156;
  line-height: 2.5;
  cursor: pointer;
`;

export const AccordionContent = styled.div`
  overflow: hidden;
`;

export const Table = styled.table`
  min-width: 100%;
  border-spacing: 0;

  td {
    text-align: center;
    line-height: 2.5;
    border-bottom: 1px solid ${borderColor};

    &:not(:last-child) {
      border-right: 1px solid ${borderColor};
    }
  }
`;

export const LightCol = styled.td`
  background-color: #130156;
`;

export const TCellHead = styled.td`
  border-right: 1px solid ${borderColor};
`;
