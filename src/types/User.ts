export type User = {
  userid: string;
  MyEmail?: string;
  MyUsername?: string;
  MyRole: string;
  exp: number;
  iss?: string;
  aud?: string;
  refreshToken: string;
};

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  saveSession: (access: string, refresh: string) => void;
  removeSession: () => void;
};
