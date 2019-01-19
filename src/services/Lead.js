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
        $survey_be_over_21: Boolean
        $survey_has_garage: Boolean
        $survey_low_points: Boolean
        $survey_app_99: Boolean
        $survey_app_uber: Boolean
        ) {
      updateLead(input: { 
           phone_number: $phone,
           step: $step,
           code2fa: $code2fa,
           survey_be_over_21: $survey_be_over_21,
           survey_has_garage: $survey_has_garage,
           survey_low_points: $survey_low_points,
           survey_app_99: $survey_app_99,
           survey_app_uber: $survey_app_uber,
           }) {
        id,
        step,
        survey_app_uber,
        survey_app_99,
      }
    }`;

export const BASIC_INFORMATION = gql`
    mutation  updateLead(
        $name: String!,
        $cpf: String!,
        $email: String!,
        $city: String!,
        $step: String!,
        $phone: String!,
        $code2fa: String!,
        ) {
      updateLead(input: { 
           name: $name,
           cpf: $cpf,
           email: $email,
           work_city: $city,
           step: $step,
           phone_number: $phone,
           code2fa: $code2fa,
           
           }) {
        id,
        status,
        step,
        cpf,
        email,
        work_city,
      }
    }`;
