import styled from "styled-components";
import { Button } from "antd";

export const BoxPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border-radius: 8px;
  background: #fff;
`;

export const BoxItem = styled.div`
  width: 80%;
`;

export const CustomButton = styled(Button)`
  min-width: ${(props) => (props.width ? props.width : "40%")};
  height: 40px;
  font-size: 18px;
`;
