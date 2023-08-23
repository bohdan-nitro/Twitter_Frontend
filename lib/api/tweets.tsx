import axios from "axios";
import { API_URL } from "./config";
import { PropsWithChildren, createContext, useContext } from "react";
import { useAuth } from "../../context/AuthContext";

const TweetsApiContext = createContext({});

const TweetApiContextProvider = ({children}: PropsWithChildren) => {

  const {authToken} = useAuth();

  console.log("AUTH", authToken)

 const listTweets = async () => {
  if (!authToken) {
    return;
  }

    const res = await axios.get(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    if(res.data){
      return res.data
    }
    if(res.status !== 200){
      throw new Error("Error fetchin api")
    }
}
 const getTweet = async (id: string) => {
  if (!authToken) {
    return;
  }
const res = await axios.get(`${API_URL}/tweet/${id}`, {
  headers: {
    Authorization: `Bearer ${authToken}`
  }
})
if(res.status === 401){
  throw new Error("Please sign in, you are not authorized")
}
if(res.status !== 200){
  throw new Error("Error fetchin api")
}
return res.data
}
 const createTweet = async (data: {content: string}) => {
  if (!authToken) {
    return;
  }
const res = await fetch(`${API_URL}/tweet`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-type": "application/json"
  },
  body: JSON.stringify(data)
})
if(res.status === 401){
  throw new Error("Please sign in, you are not authorized")
}
if(res.status !== 200){
  throw new Error("Error creating tweet")
}
return await res.json()
}
  return (
    <TweetsApiContext.Provider value={{
      listTweets,
      getTweet,
      createTweet
    }}>
      {children}
  </TweetsApiContext.Provider>
  )
}

export default TweetApiContextProvider;

export const useTweetsApi = () => useContext(TweetsApiContext);


