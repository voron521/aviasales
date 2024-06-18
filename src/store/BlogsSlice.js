
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

export const fetchEditUser = createAsyncThunk(
  'users/fetchEditUser',
  async ({ data, apiKey }, { rejectWithValue }) => {
    console.log("data fetchEditUser:", data);

    const optionsUser = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        "user": {
          "username": data.username,
          "email": data.email,
          "password": data.password,
          "image": data.avatarImage,
          "bio": 'I work at State Farm.',
        }
      })
    };

    console.log("options edit", optionsUser);
    const apiBase = "https://blog.kata.academy/api/user";
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

export const fetchNewArticle = createAsyncThunk(
  'users/fetchNewArticle',
  async ({ data, apiKey }, { rejectWithValue }) => {
    console.log("data in fetchNewArticle: ", data);

    const optionsArticle = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        "article": {
          "title": data.article.title,
          "description": data.article.description,
          "body": data.article.description,
          "tagList": [
            ...data.article.tags,
          ]
        }
      })
    };

    console.log("optionsArticle", optionsArticle);
    const apiBase = "https://blog.kata.academy/api/articles";
    try {
      const res = await fetch(apiBase, optionsArticle);
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

export const fetchUpdateArticle = createAsyncThunk(
  'users/fetchUpdateArticle',
  async ({ data, slug, apiKey }, { rejectWithValue }) => {
    console.log("slug in fetchUpdateArticle: ", slug);

    const optionsUpdateArticle = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        "article": {
          "title": data.article.title,
          "description": data.article.description,
          "body": data.article.description,
          "tagList": [
            ...data.article.tags,
          ]
        }
      })
    };

    console.log("optionsUpdateArticle", optionsUpdateArticle);
    const apiBase = `https://blog.kata.academy/api/articles/${slug}`;
    try {
      const res = await fetch(apiBase, optionsUpdateArticle);
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

export const fetchDeleteArticle = createAsyncThunk(
  'users/fetchDeleteArticle',
  async ({ slugToDelete, apiKey }, { rejectWithValue }) => {
    console.log("slug, apiKey in fetchDeleteArticle: ", slugToDelete, apiKey);

    const optionsArticleDelete = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
     
    };

    console.log("optionsArticleDelete", optionsArticleDelete);
    const apiBase = `https://blog.kata.academy/api/articles/${slugToDelete}`;
    try {
      const res = await fetch(apiBase, optionsArticleDelete);
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
    myArticles: null,
    tagsList: [],
    deleteArticleWindow: false,
    
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
    setDivWrapperRoghtButtons(state, action){
      state.signInButtonClass = action.payload;
    },
    setMyArticles(state, action){
      state.myArticles = action.payload;
    },
    setTagsList(state, action) {
      if (action.payload === 'clean'){
        state.tagsList = []
      } else {
        if (Array.isArray(action.payload)) {
          state.tagsList = [...state.tagsList, ...action.payload];
        } else {
          state.tagsList = [...state.tagsList, action.payload];
        }
        
      }
      
    },
    setTagsListChangeItem(state, action) {
      state.tagsList[action.payload.index] = action.payload.item;
    },
    setTagsListDeleteItem(state, action) {
      state.tagsList = state.tagsList.filter((_, index) => index !== action.payload);

    },
    setDeleteArticleWindow(state) {
      state.deleteArticleWindow = !state.deleteArticleWindow
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
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

export const { setBlogs, setPage, setChoseArticle, setregistrationNewUserError, setUserInfo, setMyArticles, setTagsList, setTagsListChangeItem, setTagsListDeleteItem, setDeleteArticleWindow } = BlogSlice.actions;

export default BlogSlice.reducer;