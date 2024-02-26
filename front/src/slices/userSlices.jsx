import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../sevices/userServices";

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

//get user details
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    return data;
  }
);

//update an User
export const updateUser = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateUser(user, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }


    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.getUserDetails(id);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }


    return data;
  }
);






export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers:(builder) =>{ 
    builder
    .addCase(profile.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = action.payload;
    }).addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = action.payload;
      state.message = "Usuário atualizado com sucesso!";
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = action.payload;
    })
    }
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
