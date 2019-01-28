import gql from 'graphql-tag'

const returnDriver = `
  id
  code2fa
  cpf
  name
  birthdate
  nickname
  gender
  photo
  email
  email_verified
  phone_number
  phone_number_verified
  address_street_name
  address_street_number
  address_street_no_number
  address_street_details
  address_neighborhood
  address_city
  address_state
  address_postal_code
  address_country
  address_latlong
  license_number
  license_issued_at
  license_expired_at
  license_category
  license_points
  license_status
  license_status_detail
  license_remarks
  license_city
  license_state
  emergency_1_name
  emergency_1_phone_number
  emergency_2_name
  emergency_2_phone_number
  newsletter
  status
  total_referrals
  total_fines
  total_bookings
  booking {
    id
    plan {
      id
      name
      description
      status
      pre_transaction_amount
      transaction_amount
    }
  }
  checked_at
  created_at
  updated_at
`

export const CREATE_LEAD = gql`
    mutation newLead($phone_number: String!) {
      createLead(input: { phone_number: $phone_number }) {
        ${returnDriver}
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

export const COMPLETE_INFO = gql`
    mutation  updateLead(
        $license_number: String,
        $emergency_2_name: String,
        $emergency_2_phone_number: String,
        $emergency_1_name: String,
        $emergency_1_phone_number: String,
        $address_state: String,
        $address_city: String,
        $address_neighborhood: String,
        $address_street_details: String,
        $address_street_no_number: Int,
        $address_street_name: String,
        $address_postal_code: String,  
        $step: String!,
        $phone: String!,
        $code2fa: String!
        ) {
      updateLead(input: { 
            license_number: $license_number,
            emergency_2_name: $emergency_2_name,
            emergency_2_phone_number: $emergency_2_phone_number,
            emergency_1_name: $emergency_1_name,
            emergency_1_phone_number: $emergency_1_phone_number,
            address_state: $address_state,
            address_city: $address_city,
            address_neighborhood: $address_neighborhood,
            address_street_details: $address_street_details,
            address_street_no_number: $address_street_no_number,
            address_street_name: $address_street_name,
            address_postal_code: $address_postal_code,  
            step: $step,
            phone_number: $phone,
            code2fa: $code2fa,
           
           }) {
        id,
        status,
        step,
      }
    }`;
export const LOGIN_99 = gql`
    mutation  updateLead(
        $cardbegin: String!,
        $cardend: String!,
        $username: String!,
        $driver: String!,
        $phone: String!,
        $code2fa: String!
        ) {
      updateLead(input: { 
        		login99: {
              cardbegin: $cardbegin,
              cardend: $cardend,
              username: $username,
              driver: $driver
            },
            phone_number: $phone,
            code2fa: $code2fa,
          
           }) {
        id,
        status,
        step,
      }
    }
   `;
export const PAYMENT = gql`
    mutation  updateLead(
        $cc_holder_name: String,
        $cc_holder_cpf: String,
        $cc_number: String,
        $cc_expired_at: String,
        $driver: String!,
        $type: String!,
        $phone: String!,
        $code2fa: String!
        ) {
      updateLead(input: { 
        	payment: {
              cc_holder_name: $cc_holder_name,
              cc_holder_cpf: $cc_holder_cpf,
              cc_number: $cc_number,
              cc_expired_at: $cc_expired_at,
              driver: $driver
              type: $type
            },
            phone_number: $phone,
            code2fa: $code2fa,
          
           }) {
        id,
        status,
        step,
      }
    }
   `;
