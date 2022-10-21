import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  jobs: [],
  jobsPerPage: [],
  stats: {},
  monthlyApplications: [],
  NumOfPages: 1,
  page: 1,
  totalJobs: 0,
  loading: true,
};

export const GetAllJobs = createAsyncThunk(
  "job/GetAllJobs",
  async (filters, thunkAPI) => {
    try {
      let url =
        process.env.REACT_APP_BACKEND_URL +
        "/api/jobs/alljobs" +
        `?status=${filters.status}&type=${filters.type}&sort=${filters.sort}`;
      if (filters.search) {
        url = url + `&search=${filters.search}`;
      }
      const response = await axios.get(url, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const ShowStats = createAsyncThunk(
  "job/ShowStats",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/jobs/stats",
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

export const CreateJob = createAsyncThunk(
  "job/CreateJob",
  async (job, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/jobs/createJob",
        job,
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

export const DeleteJob = createAsyncThunk(
  "jobs/DeleteJob",
  async (JobId, thunkAPI) => {
    thunkAPI.dispatch(OnLoading());
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/jobs/${JobId}`,
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

export const EditJob = createAsyncThunk(
  "jobs/EditJob",
  async (body, thunkAPI) => {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/api/jobs/edit-job",
        body,
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

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    OnLoading: (state) => {
      state.loading = true;
    },
    OffLoading: (state) => {
      state.loading = false;
    },
    NextPage: (state) => {
      if (state.page + 1 <= state.NumOfPages) {
        state.page++;
        state.jobsPerPage = state.jobs.slice(
          0 + (state.page - 1) * 10,
          10 + (state.page - 1) * 10
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
    PrevPage: (state) => {
      if (state.page !== 1) {
        state.page--;
        state.jobsPerPage = state.jobs.slice(
          0 + (state.page - 1) * 10,
          10 + (state.page - 1) * 10
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
    ChangePage: (state, action) => {
      state.page = action.payload.page;
      state.jobsPerPage = state.jobs.slice(
        0 + (state.page - 1) * 10,
        10 + (state.page - 1) * 10
      );
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    ClearValues: (state) => initialState,
  },
  extraReducers: {
    [CreateJob.fulfilled]: (state, action) => {
      state.jobs = action.payload.jobs;
      state.loading = false;
      toast.success("Successfully added job");
      console.log("CreateJob fulfilled");
    },
    [CreateJob.pending]: (state) => {
      console.log("CreateJob pending");
      state.loading = true;
    },
    [CreateJob.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },

    [GetAllJobs.fulfilled]: (state, action) => {
      state.jobs = action.payload.jobs;
      state.totalJobs = action.payload.totalJobs;
      state.NumOfPages = action.payload.NumOfPages;
      state.page = 1;
      state.jobsPerPage = state.jobs.slice(
        0 + (state.page - 1) * 10,
        10 + (state.page - 1) * 10
      );
      state.loading = false;
      console.log("GetAllJobs fulfilled");
    },
    [GetAllJobs.pending]: (state) => {
      console.log("GetAllJobs pending");
      state.loading = true;
    },
    [GetAllJobs.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },

    [ShowStats.fulfilled]: (state, action) => {
      state.stats = action.payload.defaultStats;
      state.monthlyApplications = action.payload.monthlyApplications;
      state.loading = false;
      console.log("ShowStats fulfilled");
    },
    [ShowStats.pending]: (state) => {
      console.log("ShowStats pending");
      state.loading = true;
    },
    [ShowStats.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },

    [DeleteJob.fulfilled]: (state, action) => {
      state.jobs = action.payload.jobs;
      state.totalJobs = action.payload.totalJobs;
      state.NumOfPages = action.payload.NumOfPages;
      state.page = 1;
      state.jobsPerPage = state.jobs.slice(
        0 + (state.page - 1) * 10,
        10 + (state.page - 1) * 10
      );
      state.loading = false;
      toast.success("Job deleted");
      console.log("DeleteJob fulfilled");
    },
    [DeleteJob.pending]: (state) => {
      console.log("DeleteJob pending");
      state.loading = true;
    },
    [DeleteJob.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },

    [EditJob.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success("Job modified");
      console.log("EditJob fulfilled");
    },
    [EditJob.pending]: (state) => {
      console.log("EditJob pending");
      state.loading = true;
    },
    [EditJob.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },
  },
});

export const {
  OnLoading,
  OffLoading,
  NextPage,
  PrevPage,
  ChangePage,
  ClearValues,
} = jobSlice.actions;

export default jobSlice.reducer;
