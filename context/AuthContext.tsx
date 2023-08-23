import { PropsWithChildren, createContext, useState, useContext, useEffect } from "react";
import { useRouter, useSegments, useRootNavigationState, Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store"

const AuthContext = createContext({})

const AuthProvider = ({children}: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const segments = useSegments();
    const router = useRouter();

    console.log(authToken, "atuhTOKEN")

   

    useEffect(() => {
        const isAuthGroup = segments[0] === '(auth)';
    
        if (!authToken && !isAuthGroup) {
          router.replace('/(auth)/singIn');
        }
        if (authToken && isAuthGroup) {
          router.replace('/feed/');
        }
      }, [segments, authToken]);

      useEffect(() => {
        const loadAtuhToken = async () => {
          const res = await SecureStore.getItemAsync('authToken');
          if(res){
            setAuthToken(res);
          }
        }
        loadAtuhToken()
    }, [])

      const updateAuthToken = async (newToken: string) => {
        await SecureStore.setItemAsync('authToken', newToken)
        setAuthToken(newToken);
      }

      const removeAuthToken = async () => {
        await SecureStore.deleteItemAsync('authToken');
        setAuthToken(null);
      };

    return <AuthContext.Provider value={{authToken, updateAuthToken, removeAuthToken}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider;

export const useAuth = () => useContext(AuthContext)