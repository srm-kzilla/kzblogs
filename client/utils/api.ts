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
      ALL: "/api/blogs/all",
      GET: (id: string) => `/api/blogs/${id}`,
      TRENDING: "/api/trending",
      BOOKMARKS: "/api/bookmarks/",
      LIKES: (id: string) => `/api/likes/${id}`,
    },
  },
};

async function getSessionToken() {
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
  }
}

export async function getAllBlogs() {
  const sessionToken = await getSessionToken();
  try {
    if (sessionToken !== undefined) {
      const response = await axios.get(API.BASE_URL + API.ENDPOINTS.BLOGS.ALL, {
        headers: {
          "X-Session-ID": sessionToken,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getBlog(_id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      const response = await axios.get(
        API.BASE_URL + API.ENDPOINTS.BLOGS.GET(_id),
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
      console.log(response.headers);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.error("SESSION TOKEN NOT DEFINED");
  }
}

export async function getTrending() {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      const response = await axios.get(
        API.BASE_URL + API.ENDPOINTS.BLOGS.TRENDING,
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
}

export async function toggleBookmark(id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      await axios.post(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BOOKMARKS + id,
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
      await axios.post(API.BASE_URL + API.ENDPOINTS.BLOGS.LIKES(id), null, {
        headers: {
          "x-session-id": sessionToken,
        },
      });
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
        API.BASE_URL + API.ENDPOINTS.BLOGS.BOOKMARKS,
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
}

export async function addBlog(data: any) {
  try {
    const sessionToken = await getSessionToken();
    console.log(data);

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
      console.log("SESSION TOKEN NOT DEFINED");
      throw new Error("Session token not defined");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
