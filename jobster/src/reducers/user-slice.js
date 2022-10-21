import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ClearValues } from "./job-slice";
import { toast } from "react-toastify";
import axios from "axios";

const getUser = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const initialState = {
  loading: false,
  user: getUser(),
  sideBarOpen: false,
};

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/users/register",
        user
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "user/Login",
  async (user, thunkAPI) => {
    if (user.email === "testUser@gmail.com") {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/api/users/login",
          user,
          {
            headers: {
              "x-access-token": "TestUser",
            },
          }
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/users/login",
        user
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const ChangeUser = createAsyncThunk(
  "user/ChangeUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/api/users/update",
        user,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const Logout = createAsyncThunk("/user/logout", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(ClearValues());
    return Promise.resolve;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SideBarToggle: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
    },
    LogoutUser: (state) => {
      state.user = null;
      state.sideBarOpen = false;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [Logout.fulfilled]: (state, action) => {
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logging out...");
    },

    [RegisterUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.loading = false;
      toast.success(`Hello there, ${action.payload.user.name}`);
      console.log("RegisterUser fulfilled");
    },
    [RegisterUser.pending]: (state) => {
      console.log("RegisterUser pending");
      state.loading = true;
    },
    [RegisterUser.rejected]: (state, action) => {
      state.user = null;
      state.loading = false;
      toast.error(action.payload);
    },

    [LoginUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.loading = false;
      toast.success(`Hello there, ${action.payload.user.name}`);
      console.log("LoginUser fulfilled");
    },
    [LoginUser.pending]: (state) => {
      console.log("LoginUser pending");
      state.loading = true;
    },
    [LoginUser.rejected]: (state, action) => {
      state.user = null;
      state.loading = false;
      toast.error(action.payload);
      console.log("LoginUser rejected");
    },

    [ChangeUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.loading = false;
      toast.success("All changes are saved");
      console.log("ChangeUser fulfilled");
    },
    [ChangeUser.pending]: (state) => {
      console.log("ChangeUser pending");
      state.loading = true;
    },
    [ChangeUser.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
      console.log("ChangeUser rejected");
    },
  },
});

export const SideBarToggle = userSlice.actions.SideBarToggle;
export default userSlice.reducer;
