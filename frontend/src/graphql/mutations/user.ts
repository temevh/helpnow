import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      user {
        id
        username
        email
      }
      message
    }
  }
`;
