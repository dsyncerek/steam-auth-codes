import { margin } from 'polished';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { AccountStyled } from '../Account/Account.styled';

export const AccountsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${props => margin(props.theme.gutter * -2, 0, 0)};

  ${AccountStyled} {
    width: 100%;
    ${props => margin(props.theme.gutter * 2, props.theme.gutter, 0)};

    ${breakpoint('sm')`
      width: 200px;
    `}
  }
`;
