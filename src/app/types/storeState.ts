export interface Token {
  id: string;
  email: string;
  name: string;
  address: string;
}

export interface StoreState {
  token: Token | null;
  setToken: (token: Token) => void;
  clearToken: () => void;
}
