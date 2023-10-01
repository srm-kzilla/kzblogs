import { cookies } from "next/headers";

export async function getSessionToken() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("next-auth.session-token");
  const sessionToken = cookie?.value;
  return sessionToken;
}


const bodyData = {
  user_id: "651666df0a7ca753949b1832",
};


export async function getAllBlogs(){
    const sessionToken=await getSessionToken();
    if(sessionToken!=undefined){
        const response = await fetch(`http://127.0.0.1:8000/admin/all`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "X-Session-ID": sessionToken,
    },
  });
  const data = await response.json();
  return data;
    }
}

export async function getBlog(_id:string){
  const sessionToken=await getSessionToken();
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


export async function addBookmark(_id:string){
  const sessionToken=await getSessionToken();
  if(sessionToken!=undefined){
      const response = await fetch(`http://127.0.0.1:8000/api/bookmarks/${_id}`, {
  method: "POST",
  cache: "no-store",
  headers: {
    "X-Session-ID": sessionToken,
  },
  body:JSON.stringify(bodyData)
});
const data = await response.json();
return data;
  }
  else
  return console.error("SESSION TOKEN NOT DEFINED")
}

export async function getTrending(_id:string){
  const sessionToken=await getSessionToken();
  if(sessionToken!=undefined){
      const response = await fetch(`http://127.0.0.1:8000/api/bookmarks/${_id}`, {
  method: "POST",
  cache: "no-store",
  headers: {
    "X-Session-ID": sessionToken,
  },
  body:JSON.stringify(bodyData)
});
const data = await response.json();
return data;
  }
  else
  return console.error("SESSION TOKEN NOT DEFINED")
}