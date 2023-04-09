import styled from 'styled-components';

export const MainConteiner = styled.div`
  padding: 0 16px;
  max-width: 767px;
  /* margin-left: auto;
  margin-right: auto; */

  @media screen and (min-width: 768px) {
    padding: 0 32px;
    max-width: 1439px;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 100px;
  }
`;
