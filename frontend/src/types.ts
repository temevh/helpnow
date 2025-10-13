export enum PostStatus {
  OPEN = "OPEN",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
}

// ---------- USER ----------
export type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
  email: string;
  password: string;
  posts?: Post[]; // posts created by this user
  volunteers?: Volunteer[]; // volunteering actions
  createdAt: string; // ISO date string
};

// ---------- POST ----------
export type Post = {
  id: string;
  name: string;
  description?: string | null;
  locApprox: string;
  locAccurate: string;
  taskTime: string; // ISO date string
  creator: User;
  userId: string;
  volunteers?: Volunteer[];
  volunteerAmount: number;
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
