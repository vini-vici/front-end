import React from 'react';

import { useEffect } from 'react';

import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/config.json';

import Amplify, { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { CognitoUser, ISignUpResult, UserData } from 'amazon-cognito-identity-js';

// Q: How do we do this without needing to hardcode the values for the 
Amplify.configure({
  Auth: {
    region: REGION,
    userPoolId: POOL_ID,
    userPoolWebClientId: CLIENT_ID,
    oauth: {
      domain: COGNITO_DOMAIN,
      scope: [
        'phone',
        'email',
        'openid'
      ],
      responseType: 'code'
    }
  }
});

interface GenericUser {
  username?: string;
  [key: string]: string;
}

interface CognitoContext {
  user?: CognitoUser;
  genericUser?: GenericUser;
  signIn(username: string, password: string): Promise<CognitoUser>;
  signOut(): Promise<null>;
  verify(username: string, code: string): Promise<unknown>;
  signUp(username:string, password: string, email: string, phone: string, preferredUsername: string): Promise<ISignUpResult>;
}

const Context = React.createContext<CognitoContext | undefined>(undefined);

function attributeToObject(attr: UserData): GenericUser {
  return attr.UserAttributes.reduce((cum, cur) => {
    cum[cur.Name] = cur.Value;
    return cum;
  }, {} as GenericUser);
}

export function CognitoProvider({ children }: {children: React.ReactElement}): React.ReactElement {

  const [user, setUser] = React.useState<CognitoUser | null>(null);
  const [genericUser, setGenericUser] = React.useState<GenericUser>({});
  
  useEffect(() => {
    Auth
      .currentAuthenticatedUser()
      .then((res: CognitoUser) => {
        setUser(res);
        res.getUserData((err, ud) => {
          if(err) {
            console.error(err);
            return false;
          }
          const data = attributeToObject(ud);
          data.username = ud.Username;
          setGenericUser(data);
        });
      })
      .catch(() => void 0);
    
    Hub.listen('auth', event => {
      console.log('data payload', event.payload);

      if(event.payload.event === 'signIn') {
        setUser(event.payload.data);
        const ud = event.payload.data as CognitoUser;
        ud.getUserData((err, d) => {
          if(err) 
            return console.error(err);
          
          setGenericUser(d.UserAttributes.reduce((cum, cur) => {
            cum[cur.Name] = cur.Value;
            return cum;
          }, {} as GenericUser));
        });
      }
      
      if(event.payload.event === 'signOut') {
        setGenericUser({username: ''});
        setUser(null);
      }
      
    });

  }, []);

  const ctx: CognitoContext = {
    user,
    genericUser,
    signIn: (username, password) => Auth.signIn(username, password)
      .then(res => {
        setUser(res);
        return res;
      })
      .catch(e => {
        console.error(e);
        throw e;
      }),
    signOut: () => Auth.signOut({ global: true})
      .then( res => {
        console.log('signing out?', res);
        setUser(null);
        return res;
      })
      .catch(console.error),
    verify: (username, code) => Auth.confirmSignUp(username, code)
      .then(res => {
        console.log(res);
        setUser(res);
        return res;
      })
      .catch(console.error),
    signUp: (username, password, email, phone, preferredUsername) => 
      Auth.signUp({
        username,
        password,
        attributes: {
          phone,
          email,
          preferred_username: preferredUsername
        }
      })
        .then(res => {
          setUser(res.user);
          return res;
        })
  };

  return (
    <Context.Provider value={ctx}>
      {children}
    </Context.Provider>
  );
} 


export default function useCognito() {
  const ctx = React.useContext(Context);
  return { 
    ...ctx,
    Auth
  };
}