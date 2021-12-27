import styled from "styled-components";
import { themes } from "../../themes/themes";

export const Container = styled.div`
  &::after{
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${themes.color.background_modal};
    z-index:1;
  }

  >section{
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 20px;
    box-shadow: 3px 3px 10px 1px ${themes.color.background_modal};
    max-width: 60%;
    width: 400px;
    padding: 50px;
    z-index: 2;

    h2{
      margin-bottom: 20px;
      text-align: center;
      font-size: 24px;
    }
  }
`