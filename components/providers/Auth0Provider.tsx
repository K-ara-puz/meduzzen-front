"use client";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {
  const domain = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CALLBACK_URL;
  const audience = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_AUDIENCE;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "email",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
