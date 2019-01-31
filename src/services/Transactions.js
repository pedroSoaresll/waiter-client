import gql from 'graphql-tag'

export const TRANSACTION_DRIVER_INFO = gql`
    query TransactionsDriver(
    $driver: ID!,
    ) {
        transactions(driver:$driver) {
            items {
                id,
                updated_at
                status,
                barcode_url,
                description,
                payment_method {
                    type
                }
            }
        }
    }
`;
