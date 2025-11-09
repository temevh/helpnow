import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      user {
        id
        username
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $username: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      email: $email
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        id
        username
        email
      }
      message
    }
  }
`;
