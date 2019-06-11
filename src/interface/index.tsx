import { History } from "history";

export interface IUser {
  id: string;
  name: string;
  email: string;
  links: ILink[];
}

export interface IVote {
  id: string;
  link: ILink;
  user: IUser;
}

export interface ILink {
  id: string;
  createdAt: string;
  description: string;
  url: string;
  postedBy: {
    name: string
  }
  votes: IVote[]
}

export interface IProps {
  link: ILink;
}

export interface IData {
  feed: ILinks;
}

export interface ILinks {
  links: ILink[];
}

export interface IPropsCreateLink {
  history: History;
}

export interface IAccount {
  data: { email?: string; password: string; name: string };
}

export interface IAccountDataResponse {
  signup: { token: string };
  login: { token: string };
}
