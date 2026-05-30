import { Types, Document } from "mongoose";
export interface IUserAddress {
  country: string;
  city: string;
  state: string;
}
export interface IProvider {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}
export interface IUser {
  id: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  password: string;
  avatar: string;
  gender: string;
  dob: string;
  verified: boolean;
  disabled: boolean;
  lastLogin: Date | string;
  address: { country: string; city: string; state: string };
  providers: { google?: IProvider; facebook?: IProvider };
}
export interface ISession extends Document {
  uid: Types.ObjectId;
  token: string;
  userAgent: string;
  ipAddress: string;
  location?: string;
  expiresAt: Date;
  revokedAt: Date;
}

export interface ICookieOption {
  secure: boolean;
  maxAge: number;
  sameSite: boolean | "strict" | "lax" | "none" | undefined;
  httpOnly: boolean;
  path: string;
}
