import styled from "styled-components";

export const ProductStyles = styled.div`
  background: #111;
  position: relative;
  color: white;

  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;
  img {
    width: 300px;
    height: 300px;
    cursor: pointer;
    object-fit: cover;
  }
  h2 {
    padding: 0.5rem 0rem;
  }
`;
