export interface User {
  name: string;
  role: 'user' | 'admin';
  email: string;
  _id: string;
}

type LoginType = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: string;
  data: any;
};

type SignupType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignupResponse extends LoginResponse {}
