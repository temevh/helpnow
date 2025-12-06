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

export const GET_VOLUNTEERED_POSTS = gql`
  query GetVolunteeredPosts($userId: String!) {
    getVolunteeredPosts(userId: $userId) {
      id
      createdAt
      user {
        id
        username
        email
      }
      post {
        id
        name
        description
        address
        taskTime
        status
        volunteersNeeded
        volunteersAlready
        reward
        creator {
          username
        }
      }
    }
  }
`;
