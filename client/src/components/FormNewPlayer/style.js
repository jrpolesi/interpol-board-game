import styled from "styled-components"
import { themes } from "../../themes/themes"

export const Container = styled.form`
  margin: 0 auto;
  display: flex ;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 90%;
  max-width: 300px;
  font-size: 30px;

  select{
    padding: 5px 15px;
    text-transform: uppercase; 
    font-size: 20px;
    width: 200px ;
    border-radius: 5px;
    background-color: white;
    flex-shrink: 0;
  }

  button{
    width: 200px ;
    padding: 8px 15px;
    background-color: ${themes.color.button_green};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    flex-shrink: 0;

    &:hover{
      background: ${themes.color.button_green_hover};
    }
  }
`