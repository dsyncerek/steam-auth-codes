import styled from 'styled-components';

export const TextLinkStyled = styled.a`
  text-decoration: none;
  transition: ${props => props.theme.transitionTime};
  color: ${props => props.theme.colorPrimary};
  border-bottom: 1px solid transparent;
  
  &:hover,
  &:focus {
    color: inherit;
    border-bottom: 1px solid currentColor;
  }
`;
