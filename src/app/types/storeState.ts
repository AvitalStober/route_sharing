export interface Token {
  id: string;
  email: string;
  name: string;
}

export interface StoreState {
  token: Token | null;
  setToken: (token: Token) => void;
  clearToken: () => void;
}
