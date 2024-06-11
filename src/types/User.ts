
export type User = {
  userid: string;
  MyEmail?: string;
  MyUsername?: string;
  MyRole: string;
  exp: number;
  iss?: string;
  aud?: string;
  refreshToken: string;
  profileId: number
};

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  saveSession: (access: string, user: User) => void;
  removeSession: () => void;
};
