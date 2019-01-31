import gql from 'graphql-tag'

export const BOOKING_INFO = gql`
    query Booking($id: ID!) {
        booking(id: $id) {
            id
            driver {
                id
                name
                cpf
                license_number
                phone_number
            }
            car {
                license_plate
                license_number
                version
                brand {
                    id
                    name
                }
                fuel {
                    id
                    name
                }
            }
            odometer
            transaction_amount
            transaction_discount
            transaction_type
            pre_transaction_amount
            pre_transaction_discount
            pre_transaction_installments
            pre_transaction_type
            car_delivery_scheduled
            status
            cycle
            started_at
            finished_at
            created_at
            plan {
                id
                name
                km_max
            }
        }
    }`;

export const BOOKING_UPDATE = gql`
    mutation UpdateBookingSignup(
    $id: ID!
    $driver: ID!
    $plan: ID!
    $pre_transaction_method: ID!
    $transaction_method: ID!
    ) {
        updateBookingSignup(
            id: $id
            input: {
                driver: $driver
                plan: $plan
                transaction_method: $transaction_method
                pre_transaction_method: $pre_transaction_method
            }
        ) {
            id
        }
    }

`;

export const BOOKING_OPEN = gql`
    mutation OpenBoking(
    $driver: ID!,
    $plan: ID!,
    $started_at: String!,
    $car_delivery_scheduled: String,
    ) {
        openBooking(input: {
            driver: $driver,
            plan: $plan,
            started_at: $started_at
            car_delivery_scheduled: $car_delivery_scheduled
        }) {
            id,
            started_at,
            car_delivery_scheduled
        }
    }`;
