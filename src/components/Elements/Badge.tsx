/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import styled from "styled-components";

export const Badge = styled.div`
    padding: 0.4rem;
    border-radius: 0.4rem;
    color: white;
    background: ${({ theme }) => theme.colors.third};
    font-weight: bold;
`;
