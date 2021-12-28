import styled, { keyframes } from 'styled-components'

const car_toRight = keyframes`
  from{
    left: -300px;
  }
  to{
    left: 100%;
  }
`

const siren_blueToRed = keyframes`
  0%{
    background-color: blue;
    box-shadow: -5px 0px 20px 5px #0000ff80;
  }
  70%{
    background-color: red;
    box-shadow: -5px 0px 20px 5px #ff000080;
  }
  100%{
    background-color: blue;
    box-shadow: -5px 0px 20px 1px #0000ff80; 
  }
`

const siren_redToBlue = keyframes`
  0%{
    background-color: red;
    box-shadow: 5px 0px 20px 1px #ff000080; 
  }
  50%{
    background-color: blue;
    box-shadow: 5px 0px 20px 5px #0000ff80;
  }
  100%{
    background-color: red;
    box-shadow: 5px 0px 20px 1px #ff000080; 
  }
`

export const Container = styled.div`
  /* transform-style: preserve-3d;
  transform: rotateY(80deg); */
  position: relative;
  height: 150px;
  width: 300px;
  margin: 130px 0 0 0;
  animation: ${car_toRight} 3s cubic-bezier(.71,.24,.54,.89) infinite;

    .car__siren{
      position: absolute;
      bottom: 193px;
      left: 100px;

      &::before{
        content: '';
        position: absolute;
        width: 30px;
        height: 20px;
        border-radius: 15px 0 0 15px;
        animation: ${siren_blueToRed} 1s infinite;
      }

      &::after{
        content: '';
        position: absolute;
        left: 30px;
        width: 30px;
        height: 20px;
        border-radius: 0 15px 15px 0;
        animation: ${siren_redToBlue} 1s infinite;
      }
    }

    .car__headlight{
      position: absolute;
      bottom: 65px;
      left: -3px;
      display: flex;
      gap: 270px;
      z-index: 1;

      &::before{
        content: '';
        width: 18px;
        height: 25px;
        border-radius: 105%;
        background-color: red;
        align-self: flex-end;
        filter: drop-shadow(-8px 0 8px red);
      }

      &::after{
        content: '';
        width: 18px;
        height: 30px;
        border-radius: 105%;
        background-color: #ffe400;
        filter: drop-shadow(12px 0 8px yellow);
      }
    }

    .car__block{
      position: absolute;
      bottom: 40px;
      left: 0px;

      .car__ceil{
        position: absolute;
        bottom: 20px;
        left: 50px;
        width: 120px;

        .car__back{
          position: absolute;
          bottom:0;
          width: 120px;
          height: 100px;
          background-color: #dcdcdc;
          border-radius: 10px;
          transform: rotate(10deg);
        }

        .car__middle{
          position: absolute;
          bottom: 10px;
          left: 10px;
          width: 125px;
          height: 100px;
          background-color: #dcdcdc;
          border-radius: 10px;
        }

        .car__front{
          position: absolute;
          bottom: 5px;
          left: 70px;
          width: 110px;
          height: 80px;
          background-color: #dcdcdc;
          border-radius: 10px;
          transform: rotate(60deg);
        }

        .car__window{
        position: absolute;
        bottom: 10px;
        left: 15px;
        width: 120px;

          .car__window--back{
            position: absolute;
            bottom: 3px;
            width: 80px;
            height: 80px;
            background-color: #0000ff30;
            border-radius: 10px 80% 0 0;
            transform: rotate(10deg);
          }

          .car__window--middle{
            position: absolute;
            bottom: -12px;
            left: 6px;
            width: 108px;
            height: 100px;
            background-color: #0000ff40;
            border-radius: 10px 30px 155%;
          }

          .car__window--front{
            position: absolute;
            bottom: 18px;
            left: 65px;
            width: 80px;
            height: 50px;
            background-color: #0000ff40;
            border-radius: 10px 0 0 100%;
            transform: rotate(60deg);
          }

          .car__window--division{
            position: absolute;
            bottom: 20px;
            left: 65px;
            width: 10px;
            height: 80px;
            background-color: #dcdcdc;
            transform: rotate(-10deg);
          }
        }
      }

    .car__floor{
      position: absolute;
      bottom: 30px;
      left: 30px;
      width: 250px;

      .car__paint--lightFloor{
        position: absolute;
        bottom: -20px;
        left: -25px;
        background-color: #dcdcdc;
        width: 290px;
        height: 65px;
        border-radius: 40px 40px 0 0;
        transform: scaleY(0.7);
      }

      .car__paint--darkFloor{
        position: absolute;
        bottom: -40px;
        left: -30px;
        background-color: #4a4a4a;
        width: 300px;
        height: 65px;
        border-radius: 40px;
        transform: scaleY(0.7);
      }
    }
  }

  .car__wheels{
    position: absolute;
    left: 30px;
    bottom: 0;
    width: fit-content;
    margin: 0 auto;
    display: flex;
    gap: 85px;

    .car__wheel{
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: black;
      border: 8px solid white;
      
      &::after{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 69%;
        height: 69%;
        border-radius: 50%;
        background-color: gray;
        transform: translate(-50%, -50%);
      }
    }
  }
`