import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_Application_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_Tenant_ID!}`,
    redirectUri: process.env.NEXT_PUBLIC_Redirect_Uri!,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_PostlogoutRedirectUri!,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);

            return;
          case LogLevel.Info:
            console.info(message);

            return;
          case LogLevel.Verbose:
            console.debug(message);

            return;
          case LogLevel.Warning:
            console.warn(message);

            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
