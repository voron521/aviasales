
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ limitArticles, offset }, { rejectWithValue }) => {
  const apiBase = `https://blog.kata.academy/api/articles?limit=${limitArticles}&offset=${offset}`;
  try {
    const res = await fetch(apiBase);
    if (!res.ok) {
      throw new Error(`Запрос не получился по url:${apiBase} он завершился со статусом: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchRegistrationNewUser = createAsyncThunk(
  'users/fetchRegistrationNewUser',
  async ({ data }, { rejectWithValue }) => {
    console.log("data", data);

    const optionsUser = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "user": {
          "username": data.username,
          "email": data.email,
          "password": data.password,
        }
      })
    };

    console.log("options", optionsUser);
    const apiBase = "https://blog.kata.academy/api/users";
    try {
      const res = await fetch(apiBase, optionsUser);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogInUser = createAsyncThunk(
  'users/fetchLogInUser',
  async ({ data }, { rejectWithValue }) => {
    console.log("data", data);

    const optionsLoginUser = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "user": {
          "email": data.email,
          "password": data.password,
        }
      })
    };

    console.log("options optionsLoginUser", optionsLoginUser);
    const apiBase = "https://blog.kata.academy/api/users/login";
    try {
      const res = await fetch(apiBase, optionsLoginUser);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const BlogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    blogsLoad: false,
    limitArticles: 10,
    totalResults: 0,
    currentPage: 1,
    choseArticle: null,
    newUserRegistrationInfo: null,
    registrationNewUserError: false,
    registrationUserInfo: null,
  },
  reducers: {
    setBlogs(state, action) {
      console.log("action.payload", action.payload);
      state.blogs = action.payload.payload.articles;
      state.blogsLoad = true;
      state.totalResults = action.payload.payload.articlesCount;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setChoseArticle(state, action) {
      state.choseArticle = action.payload;
    },
    setNewUserRegistrationInfo(state, action) {
      state.newUserRegistrationInfo = action.payload;
    },
    setregistrationNewUserError(state, action) {
      state.registrationNewUserError = action.payload;
    },
    setUserInfo(state, action) {
      state.registrationUserInfo = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log("action.payload В extraReducers", action.payload)
        state.blogs = action.payload.articles;
        state.totalResults = action.payload.articlesCount;
        state.blogsLoad = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.blogsLoad = false;
        console.error('Ошибка при загрузке статей:', action.payload);
      });
  }
});

export const { setBlogs, setPage, setChoseArticle, setregistrationNewUserError, setUserInfo } = BlogSlice.actions;

export default BlogSlice.reducer;