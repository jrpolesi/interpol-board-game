import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  left: 10px;
  margin-top: 5px;
  border-radius: 5px;
  padding: 10px;
  width: 230px;
  text-align: left;
  background: white;

  h3{
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 20px;
    font-weight: bold;

    &::after{
      content: '';
      display: inline-block;
      border-top: 10px solid black;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      transition: transform .1s;
    }

    &.up::after{
      transform: rotate(180deg);
      transition: transform .1s;
    }
  }

  ul{
    margin-top: 10px;
    padding-left: 10px;
    li{ 
      margin-top: 6px;
      font-size: 18px;

      .thief-historic__round{

        &::before{
          content:'';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: black;
          vertical-align: 3px;
          margin-right: 5px;
        }
      }

      .thief-historic__vehicle{
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }
`