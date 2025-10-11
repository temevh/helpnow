import { gql } from "apollo-server";

export const typeDefs = gql`
  enum PostStatus {
    OPEN
    ACCEPTED
    COMPLETED
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    userName: String!
    email: String!
    posts: [Post!]!
    volunteers: [Volunteer!]!
  }

  type Post {
    id: ID!
    name: String!
    description: String
    locApprox: String!
    locAccurate: String!
    taskTime: String!
    creator: User!
    status: PostStatus!
    volunteerAmount: Int!
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
    createUser(userName: String!, email: String!, password: String!): User!
    createPost(
      name: String!
      description: String
      locApprox: String!
      locAccurate: String!
      taskTime: String!
      userId: String!
    ): Post!
    volunteerForPost(postId: String!, userId: String!): Volunteer!
  }
`;
