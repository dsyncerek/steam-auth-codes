import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const FooterStyled = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  
  ${breakpoint('sm')`
    flex-direction: row;
  `}
`;

export const HeartStyled = styled.span`
  color: ${props => props.theme.colors.red};
`;
