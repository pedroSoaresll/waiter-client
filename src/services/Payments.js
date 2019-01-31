import gql from 'graphql-tag'

export const PAYMENTMETHOD_CREATE = gql`
    mutation PaymentMethodCreate (
    $driver: ID!,
    $cc_holder_name: String,
    $cc_holder_cpf: String,
    $token: ID,
    $status: String!,
    $type: String!  
    ) {
        createPaymentMethod(
            input: {
                driver: $driver,
                token: $token,
                cc_holder_name: $cc_holder_name,
                cc_holder_cpf: $cc_holder_cpf,
                status: $status,
                type: $type
            }
        ) {
            id
            token
            driver {
                id
                name
            }
            cc_holder_name
            cc_holder_cpf
            cc_brand
            cc_number
            cc_expired_at
            status
        }
    }`;
