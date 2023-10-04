"use server"
import { cookies } from "next/headers";
import axios from "axios";

 async function getSessionToken() {
    const cookieStore = cookies();
    const cookie = cookieStore.get("next-auth.session-token");
    const sessionToken = cookie?.value;
    return sessionToken;
 } 

const bodyData = {
  user_id: "651d7190ec45f6fda498c12d",
};

export async function getAllBlogs(){
    const sessionToken= await getSessionToken();
    try {
      if(sessionToken!=undefined){
        const data= await axios.get(`http://127.0.0.1:8000/admin/all`, {
          headers: {
            "x-session-id": sessionToken,
          },
        });
      const response= data.data;
      return response;
    } 
  }catch (error) {
      console.log(error)
    }
    
  }


export async function getBlog(_id:string){
    const sessionToken= await getSessionToken();
  if(sessionToken!=undefined){
      const response = await fetch(`http://127.0.0.1:8000/admin/${_id}`, {
  method: "GET",
  cache: "no-store",
  headers: {
    "X-Session-ID": sessionToken,
  },
});
const data = await response.json();
return data;
  }
  else
  return console.error("SESSION TOKEN NOT DEFINED")
}


export async function getTrending(){
    const sessionToken= await getSessionToken();
  if(sessionToken!=undefined){
      const response = await axios.get(`http://127.0.0.1:8000/api/trending`,{
  headers: {
    "X-Session-ID": sessionToken,
  }
});
const data = await response.data;
return data;
  }
  else
  return console.error("SESSION TOKEN NOT DEFINED")
}

export async function addBookmark(id:string) {
  const sessionToken= await getSessionToken()
    await axios.post(
      `http://127.0.0.1:8000/api/bookmarks/${id}`,
      bodyData,
      {
        headers: {
          "x-session-id": sessionToken,
        },
      },
    );
};

export async function addLike(id:string) {
  const sessionToken= await getSessionToken()
    await axios.post(
      `http://127.0.0.1:8000/api/likes/${id}`,
      bodyData,
      {
        headers: {
          "x-session-id": sessionToken,
        },
      },
    );
};

export async function getBookmarkBlogs(){
  const sessionToken= await getSessionToken();

  if(sessionToken!=undefined){
const data= await axios.get(`http://127.0.0.1:8000/api/bookmarks`, {
  headers: {
    "X-Session-ID": sessionToken,
  },
});
const response= data.data;
return response;
  }
}