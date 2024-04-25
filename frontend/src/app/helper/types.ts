export interface User {
  id: number;
  fullname: string;
  email: string;
  usertype: Role;
  location: string;
  booking: string;
}

export enum Role {
  user = "user",
  admin = "admin",
}

export interface Token {
  token: string;
}

export interface State {
  id: string;
  fullname: string;
  usertype: string;
  token: string;
}

export const initial_state = {
  id: "",
  fullname: "Guest",
  usertype: "",
  token: "",
};
export interface StandardResponse {
  data: string;
  success: string;
}

export interface Bike {
  _id: string;
  plate_number: string;
  color: string;
  status: string;
}

export interface Booking {
  _id: string;
  bike: Bike;
  book_date: string;
}

export interface BikeResponse {
  success: boolean;
  data: Bike[];
}
export interface BookingResponse {
  success: boolean;
  data: Booking[];
}
export interface UserResponse {
  success: boolean;
  data: User[];
}
