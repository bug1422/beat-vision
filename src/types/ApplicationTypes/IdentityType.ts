import { UserProfileDto } from "./UserProfileType";

export type CustomIdentityUserDto = {
  Id: number;
  Dob: string | null;
  UserName: string;
  Email: string;
  EmailConfirmed: boolean;
  LockoutEnd: string | null; //DATETIME
  AccessFailedCount: number;
  UserProfile?: UserProfileDto | null;
  UserTokens: CustomIdentityUserTokenDto[];
  UserClaims: CustomIdentityUserClaimsDto[];
  Roles: CustomIdentityRoleDto[];
  UserLogins: CustomIdentityUserLoginsDto[];
};

export type CustomIdentityRoleDto = {
  Id: number;
  Name?: string | null;
  Description?: string | null;
  RoleClaims: CustomIdentityRoleClaimDto[];
};

export type CustomIdentityRoleClaimDto = {
  Id: number;
  ClaimType?: string | null;
  ClaimValue?: string | null;
};

export type CustomIdentityUserLoginsDto = {
  LoginProvider: string;
  ProviderDisplayName?: string | null;
};

export type CustomIdentityUserClaimsDto = {
  Id: number;
  ClaimType?: string | null;
  ClaimValue?: string | null;
};

export type CustomIdentityUserTokenDto = {
  UserId: number;
  ExpiredDate?: string | null;
  LoginProvider: string;
  Name: string;
  Value?: string | null;
};
