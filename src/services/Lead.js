import gql from 'graphql-tag'

export const CREATE_LEAD = gql`
    mutation newLead($phone: String!, $step: String!) {
      createLead(input: { phone: $phone, step: $step }) {
        id,
        phone
      }
    }`;
export const VERIFY_CODE_LEAD = gql`
    query verify($phone: String!, $code2fa: String!) {
      lead(phone: $phone, code2fa: $code2fa) {
         id,
         phone,
         step,
         driver {
            id,
            gender,
            name,
            updated_at 
          }
      }
    }`;

export const SURVEY_DRIVER = gql`
    mutation  surveyDriver(
        $phone: String!,
        $step: String!,
        $code2fa: String!,
        $driver99: Boolean!,
        $driverUber: Boolean!,
        $age: Boolean!,
        $garage: Boolean!,
        $cnhPoints: String!
        ) {
      updateLead(input: { 
           phone: $phone,
           step: $step,
           code2fa: $code2fa,
           driver99: $driver99,
           driverUber: $driverUber,
           garage: $garage,
           cnhPoints: $cnhPoints
           }) {
        id,
        step
      }
    }`;

export const BASIC_INFORMATION = gql`
    mutation  updateLead(
        $name: String!,
        $email: String!,
        $city: String!,
        ) {
      updateLead(input: { 
           name: $name,
           email: $email,
           city: $city,
           }) {
        id,
        step
      }
    }`;
