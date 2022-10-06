export interface DecodedIdToken {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  sid: string;
}

export interface DecodedAccessToken {
  aud: [
    "https://api-dev.andescalada.org/",
    "https://andescalada-dev.us.auth0.com/userinfo",
  ];
  azp: string;
  exp: number;
  iat: number;
  iss: "https://andescalada-dev.us.auth0.com/";
  permissions: GlobalPermissions[];
  scope: "openid profile offline_access";
  sub: string;
  user_email: string;
}

export enum GlobalPermissions {
  CRUD_ZONES = "crud:zones",
  CRUD_ROLES = "crud:roles",
}
