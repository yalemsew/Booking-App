export interface User {
  id: number;
  fullname: string;
  email: string;
  usertype: string;
  location: string;
  booking: string;
}

export interface Token {
  token: string;
}

export interface State {
  id: number;
  fullname: string;
  usertype: string;
  token: string;
}

export const initial_state = {
  id: 0,
  fullname: 'Guest',
  usertype: '',
  token: '',
};
export interface StandardResponse {
  data: string;
  success: string;
}

export interface Bike {
  plate_number: string;
  color: string;
  status: string;
}

export interface BikeResponse {
  success: boolean;
  data: Bike[];
}
