import { gql } from "@apollo/client";

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

export const CREATE_POST = gql`
  mutation CreatePost($post: CreatePostInput!) {
    createPost(post: $post) {
      id
      name
      description
      address
      country
      region
      postcode
      latitude
      longitude
      taskTime
      status
      volunteersNeeded
      volunteersAlready
      creator {
        id
        username
      }
    }
  }
`;

export const CANCEL_VOLUNTEER = gql`
  mutation CancelVolunteer($postId: String!, $userId: String!) {
    cancelVolunteer(postId: $postId, userId: $userId)
  }
`;
