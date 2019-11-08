import { margin } from 'polished';
import styled, { css } from 'styled-components';
import { AccountDetailsStyled } from '../AccountDetails/AccountDetails.styled';

export const AccountListStyled = styled.div(
  props => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${margin(props.theme.gutter * -2, 0, 0)};

    ${AccountDetailsStyled} {
      width: 100%;
      ${margin(props.theme.gutter * 2, props.theme.gutter, 0)};

      @media (min-width: 576px) {
        width: 200px;
      }
    }
  `,
);
