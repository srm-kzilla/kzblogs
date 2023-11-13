"use server";
import { cookies } from "next/headers";
import axios from "axios";

const API = {
  BASE_URL: process.env.API_BASE_URL,
  ENDPOINTS: {
    ADMIN: {
      ADD: "/admin",
    },
    BLOGS: {
      ALL: "/api/blogs/all",
      GET: (id: string) => `/admin/${id}`,
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

export async function addBookmark(id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      await axios.post(
        API.BASE_URL + API.ENDPOINTS.BLOGS.BOOKMARKS,
        { blog_id: id },
        {
          headers: {
            "X-Session-ID": sessionToken,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export async function addLike(id: string) {
  const sessionToken = await getSessionToken();
  if (sessionToken !== undefined) {
    try {
      await axios.post(API.BASE_URL + API.ENDPOINTS.BLOGS.LIKES(id), null, {
        headers: {
          "X-Session-ID": sessionToken,
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
  const sessionToken = await getSessionToken();
  axios
    .post(API.BASE_URL + API.ENDPOINTS.ADMIN.ADD, data, {
      headers: {
        "X-Session-ID": sessionToken,
      },
    })
    .then((response) => {
      console.log("POST request successful:", response.data);
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
    });
}
