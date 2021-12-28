import styled, { keyframes } from 'styled-components'
// import { themes } from '../../themes/themes'

const sirene = keyframes`
  0%{
    /* background-color: blue; */
    box-shadow: 0px 0px 30px 15px blue;
  }
  50%{
    /* background-color: red; */
    box-shadow: 0px 0px 30px 15px red;
  }
  100%{
    /* background-color: blue; */
    box-shadow: 0px 0px 30px 15px blue;
  }
`

export const Container = styled.section`
  position: relative;
  width: fit-content;
  border-radius: 5px;
  padding: 20px 35px;
  background-color: white;
  margin: 20vh auto 100px;
  animation: ${sirene} 1s infinite;

  h2{
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
  button{
    display: block;
    margin: auto;
    font-size: 20px;
    color: white;
    border-radius: 5px;
    padding: 3px 10px;
    cursor: pointer;
    border: 2px solid #d63737;
    background-color: #ff5959;
    transition: background-color .5s, border-color .5s;

    &:hover{
      border: 2px solid #3855c8;
      background-color: #4969ea;
      transition: background-color .5s, border-color .5s;
    }
  }
`