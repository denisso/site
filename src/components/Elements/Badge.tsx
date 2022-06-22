import styled from "styled-components";

export const Badge = styled.div`
    padding: 0.4rem;
    border-radius: 0.4rem;
    color: white;
    background: ${({ theme }) => theme.colors.third};
    font-weight: bold;
`;
