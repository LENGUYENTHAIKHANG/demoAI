import React from "react";
import styled from "styled-components";

const InfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function InfoFooter({ swapCount, comparisionCount, children }) {
  return (
    <InfoFlex>
      <div>Số lần hoán đổi: <strong>{swapCount}</strong></div>
      <div>Số lần so sánh: <strong>{comparisionCount}</strong></div>
    </InfoFlex>
  );
}
