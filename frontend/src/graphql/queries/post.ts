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
      volunteersNeeded
      volunteersAlready
      taskTime
      reward
      creator {
        username
      }
    }
  }
`;

export const VOLUNTEER_POST = gql`
  mutation VolunteerPost($postId: String!, $userId: String!) {
    volunteerPost(postId: $postId, userId: $userId) {
      id
      accepted
      user {
        id
        username
      }
      post {
        id
        name
      }
    }
  }
`;
