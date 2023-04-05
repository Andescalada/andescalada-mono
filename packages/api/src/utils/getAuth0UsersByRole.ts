import Auth0Roles from "@andescalada/common-assets/Auth0Roles";

interface ManagementApiTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface RoleResponse {
  id: string;
  name: string;
  description: string;
}

interface Auth0User {
  user_id: string;
  picture: string;
  name: string;
  email: string;
}

const getAuth0UsersByRole = async (role: Auth0Roles) => {
  const managementApiToken = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_NEXTJS_CLIENT_ID,
        client_secret: process.env.AUTH0_NEXTJS_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      }),
    },
  ).then((response) => response.json() as Promise<ManagementApiTokenResponse>);

  const filters = {
    name_filter: role,
  };

  const roleParams = new URLSearchParams(filters).toString();

  const roles = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/roles?${roleParams}`,
    {
      headers: {
        Authorization: `Bearer ${managementApiToken.access_token}`,
      },
    },
  ).then((response) => response.json() as Promise<RoleResponse[]>);

  const usersWithRole = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/roles/${roles[0].id}/users`,
    {
      headers: {
        Authorization: `Bearer ${managementApiToken.access_token}`,
      },
    },
  ).then((response) => response.json() as Promise<Auth0User[]>);

  const users = usersWithRole.map((user) => user.email);
  const uniqueUsers = new Set(users);

  return Array.from(uniqueUsers);
};

export default getAuth0UsersByRole;
