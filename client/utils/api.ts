"use server";
import { cookies } from "next/headers";
import axios from "axios";

const API = {
  BASE_URL: process.env.API_BASE_URL,
  ENDPOINTS: {
    ADMIN: {
      BASE: "/admin",
      GET: "/all",
    },
    BLOGS: {
      BASE: "/api",
      ALL: "/blogs/all",
      WITH_ID: (id: string) => `/blogs/${id}`,
      TRENDING: "/trending",
      BOOKMARKS: "/bookmarks/",
      LIKES: (id: string) => `/likes/${id}`,
      CURRENT_USER:"/user",
      USER: (id: string) => `/user/${id}`,
      FOLLOW: (id: string) => `/follow/${id}`,
    },
  },
};

export async function getSessionToken() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("next-auth.session-token");
  const sessionToken = cookie?.value;
  return sessionToken;
}

export async function getAllBlogsAdmin() {
  const sessionToken = await getSessionToken();
  try {
    if (sessionToken !== undefined) {
      const response = await axios.get(
        API.BASE_URL + API.ENDPOINTS.ADMIN.BASE + API.ENDPOINTS.ADMIN.GET,
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllBlogs() {
  try {
    const response = await axios.get(
      API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.ALL
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBlog(_id: string) {
  const sessionToken = await getSessionToken();
  try {
    const response = await axios.get(
      API.BASE_URL +
        API.ENDPOINTS.BLOGS.BASE +
        API.ENDPOINTS.BLOGS.WITH_ID(_id),
      {
        headers: {
          "X-Session-ID": sessionToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getTrending() {
  const sessionToken = await getSessionToken();
  try {
    const response = await axios.get(
      API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.TRENDING,
      {
        headers: {
          "X-Session-ID": sessionToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function toggleBookmark(id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      await axios.post(
        API.BASE_URL +
          API.ENDPOINTS.BLOGS.BASE +
          API.ENDPOINTS.BLOGS.BOOKMARKS +
          id,
        null,
        {
          headers: {
            "x-session-id": sessionToken,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export async function toggleLike(id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      await axios.post(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.LIKES(id),
        null,
        {
          headers: {
            "x-session-id": sessionToken,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export async function toggleFollow(id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      await axios.put(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.CURRENT_USER + API.ENDPOINTS.BLOGS.FOLLOW(id),
        null,
        {
          headers: {
            "x-session-id": sessionToken,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getBookmarkBlogs() {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      const response = await axios.get(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.BOOKMARKS,
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.error("SESSION TOKEN NOT DEFINED");
  }
  return [];
}

export async function addBlog(data: any) {
  try {
    const sessionToken = await getSessionToken();
    if (sessionToken !== undefined) {
      const response = await axios.post(
        API.BASE_URL + API.ENDPOINTS.ADMIN.BASE,
        data,
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
      if (response.status == 200) {
        return response.data;
      } else {
        throw new Error("Blog creation failed");
      }
    } else {
      throw new Error("Session token not defined");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCurrentUser(){
  try{
    const sessionToken = await getSessionToken();
    if ( sessionToken !== undefined){
      const response = await axios.get(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.CURRENT_USER,
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
      return response.data;
    }
    else{
      throw new Error("Session Id not found");
    }
  }
  catch(error){
    console.error(error);
    return {};
  }
}

export async function getUser(_id:string){
  try{
    const sessionToken = await getSessionToken();
    if ( sessionToken !== undefined){
      const response = await axios.get(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BASE + API.ENDPOINTS.BLOGS.USER(_id),
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
      return response.data;
    }
    else{
      throw new Error("Session Id not found");
    }
  }
  catch(error){
    console.error(error);
    return {};
  }
}
