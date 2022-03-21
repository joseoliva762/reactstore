import { useContext, createContext, useState, ReactNode } from 'react';
import { AuthContextModel } from '@models/authContext';
import endPoints from '@services/api';
import { Auth, User } from '@models/user';
import Cookie from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext({} as AuthContextModel);

interface ProviderAuthParams {
  children: ReactNode;
}

export const ProviderAuth = ({ children }: ProviderAuthParams) => {
  const auth = useProviderAuth();
  return (
    <>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);

const useProviderAuth = (): AuthContextModel => {
  const [user, setUser] = useState<User>({} as User);

  const signIn = async (email: string, password: string) => {
    const api = endPoints.auth.login;
    const payload = { email, password };
    const options = {
      headers: {
        accept: '*/*',
        'Content-type': 'application/json'
      }
    };
    const { data: authdata } = await axios.post<Auth>(api, payload, options);
    const { access_token: token } = authdata;

    if (token) {
      const attributes = { expires: 5 };
      Cookie.set('token', token, attributes);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { data: userdata } = await axios.get<User>(endPoints.auth.profile);
      setUser(userdata);
    }
  };

  return {
    user,
    signIn
  };
};
