import gql from 'graphql-tag'

export const CREATE_LEAD = gql`
    mutation newLead($phone: String!, $step: String!) {
      createLead(input: { phone_number: $phone, step: $step }) {
        id,
        phone_number
      }
    }`;
export const VERIFY_CODE_LEAD = gql`
    query verify($phone: String!, $code2fa: String!) {
      lead(phone_number: $phone, code2fa: $code2fa) {
         id,
         phone_number,
         step,
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
           phone_number: $phone,
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
        $step: String!,
        $phone: String!,
        $code2fa: String!,
        ) {
      updateLead(input: { 
           name: $name,
           email: $email,
           work_city: $city,
           step: $step,
           phone_number: $phone,
           code2fa: $code2fa,
           
           }) {
        id,
        status,
        step,
        email,
        name,
        work_city,
      }
    }`;
