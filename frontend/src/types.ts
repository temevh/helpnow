export enum PostStatus {
  OPEN = "OPEN",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
}

// ---------- USER ----------
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  posts?: Post[]; // posts created by this user
  volunteers?: Volunteer[]; // volunteering actions
  createdAt: string; // ISO date string
};

// ---------- POST ----------
export type Post = {
  post: unknown;
  id: string;
  name: string;
  description?: string | null;
  address: string;
  latitude: number;
  longitude: number;
  taskTime: string; // ISO date string
  creator: User;
  userId: string;
  volunteers?: Volunteer[];
  volunteersNeeded: number;
  volunteersAlready: number;
  status: PostStatus;
  createdAt: string;
  reward: number;
};

// ---------- VOLUNTEER ----------
export type Volunteer = {
  id: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
  accepted: boolean;
  createdAt: string;
};
