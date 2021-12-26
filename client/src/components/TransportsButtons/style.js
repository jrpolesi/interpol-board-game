import styled from 'styled-components'
import { themes } from '../../themes/themes'

export const Container = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 0;
  width: fit-content;
  margin: auto;
  display: flex;
  gap: 5px;

  button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: 2px solid;
    border-radius: 5px;
    font-size: 20px;
    padding: 5px 10px;
    width: 120px;
    background-color: white;

    &.button--active{
      border-color: ${themes.color.button_green_hover};
      color: white;
      background-color: ${themes.color.button_green};
    }

    &:hover:not(.button--active, :disabled){
      background-color: #e8e8e8;
    }
  }
`