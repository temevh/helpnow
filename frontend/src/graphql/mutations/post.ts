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

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!, $userId: String!) {
    deletePost(postId: $postId, userId: $userId)
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($postId: String!, $userId: String!, $post: EditPostInput!) {
    editPost(postId: $postId, userId: $userId, post: $post)
  }
`;
