import styledComponents from 'styled-components';

export const Mobile = styledComponents.div`
     padding: 10px 20px;
`

export const Topic = styledComponents.h1`
    font-size: 22px;
`;

export const Table = styledComponents(Topic)`
    font-size: 22px;
    color: #264143;
`;


export const NextTopic = styledComponents.h2`
    font-size: 20px;
`;

export const Middle = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;