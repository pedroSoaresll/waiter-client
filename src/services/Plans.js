import gql from 'graphql-tag'

// language=GraphQL
export const LIST_PLANS = gql`
    query Plan($status: String!) {
        plans(status: $status, page: 0, limit: 10) {
            items {
                id
                description
                transaction_amount
                name
            },
            count
        }
    }`;
