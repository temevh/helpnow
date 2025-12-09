import { gql } from "apollo-server";

export const typeDefs = gql`
  enum PostStatus {
    OPEN
    ACCEPTED
    COMPLETED
    CLOSED
    FILLED
  }

  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    posts: [Post!]!
    volunteers: [Volunteer!]!
    createdAt: String!
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
    getVolunteeredPosts(userId: String!): [Volunteer!]!
  }

  type postCreation {
    name: String!
    description: String!
    taskTime: Date!
    volunteersNeeded: Int!
    country: String!
    region: String!
    address: String!
    postcode: String!
  }

  input CreatePostInput {
    name: String!
    description: String
    address: String!
    latitude: Float!
    longitude: Float!
    taskTime: String!
    userId: String!
    reward: Int
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    volunteerPost(postId: String!, userId: String!): Volunteer!
    createUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): CreateUserPayload!
    authenticateUser(username: String!, password: String!): AuthPayload!
    cancelVolunteer(postId: String!, userId: String!): Boolean!
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
