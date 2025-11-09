import { gql } from "apollo-server";

export const typeDefs = gql`
  enum PostStatus {
    OPEN
    ACCEPTED
    COMPLETED
    CLOSED
  }

  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]!
    volunteers: [Volunteer!]!
  }

  type Post {
    id: ID!
    name: String!
    description: String
    address: String!
    latitude: Float!
    longitude: Float!
    taskTime: String!
    creator: User!
    status: PostStatus!
    volunteersNeeded: Int!
    volunteersAlready: Int!
    volunteers: [Volunteer!]!
    createdAt: String!
    reward: Int!
  }

  type Volunteer {
    id: ID!
    user: User!
    post: Post!
    accepted: Boolean!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(
      name: String!
      description: String
      address: String!
      latitude: Float!
      longitude: Float!
      taskTime: String!
      userId: String!
      reward: Int
    ): Post!
    volunteerPost(postId: String!, userId: String!): Volunteer!
    createUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): CreateUserPayload!
    authenticateUser(username: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    user: User!
    message: String!
  }

  type CreateUserPayload {
    user: User
    message: String!
  }
`;
