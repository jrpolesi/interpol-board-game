import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 8px 10px;
  max-width: 1750px;
  background: #2f5678;
  box-sizing: border-box;


  @media (max-width: 768px){
    flex-direction: column;
    gap: 8px;
  }

`