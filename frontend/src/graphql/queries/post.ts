import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      name
      description
      status
      latitude
      longitude
      volunteerAmount
      taskTime
      creator {
        username
      }
    }
  }
`;
