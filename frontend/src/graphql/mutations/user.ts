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

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      userName: $userName
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      firstName
      lastName
      userName
      email
    }
  }
`;
