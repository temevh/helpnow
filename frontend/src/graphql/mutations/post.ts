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

export const CANCEL_VOLUNTEER = gql`
  mutation CancelVolunteer($postId: String!, $userId: String!) {
    cancelVolunteer(postId: $postId, userId: $userId)
  }
`;
