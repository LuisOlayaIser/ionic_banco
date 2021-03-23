export interface LoginRes {
  id: number;
  access_token: string;
  token_type: string;
  expires_at: string;
}

export interface Login {
  email: string,
  password: string,
  remember_me?: boolean
}

export interface Signup {
  name: string;
  identification_card: string;
  email: string;
  password: string;
}

export interface Info {
  id: number;
  token: string;
}

export interface Account {
  id?: number;
  number?: string;
  alias: string;
  balance?: number;
  bank_id: number;
  account_type_id: number;
  user_id?: number;
  created_at?: any;
  updated_at?: any;
  bank?: Bank;
  account_type?: Bank;
  movements?: Movement[];
}

export interface Bank {
  id?: number;
  name: string;
  created_at?: any;
  updated_at?: any;
}

export interface Movement {
  id?: number;
  transaction?: string;
  date?: string;
  amount: number;
  coin: string;
  description: string;
  status_id?: number;
  created_at?: string;
  updated_at?: string;
  accounts?: Account[];
  pivot?: Pivot;
  /* form */
  origin_id?: number;
  destination_id?: number;
}

interface Pivot {
  account_id: number;
  movement_id: number;
  type: string;
}