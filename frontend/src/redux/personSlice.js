import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance'; // assuming axiosInstance is exported from this file

// Initial state for persons
const initialPersonState = {
  persons: [],
  person: null,
  loading: false,
  error: null,
};

// Async thunks for person operations
export const fetchPersons = createAsyncThunk('persons/fetchPersons', async () => {
  const { data } = await axiosInstance.get('/persons/');
  return data;
});

export const fetchPerson = createAsyncThunk('persons/fetchPerson', async (personId) => {
  const { data } = await axiosInstance.get(`/persons/${personId}/`);
  return data;
});

export const createPerson = createAsyncThunk('persons/createPerson', async (personData) => {
  const { data } = await axiosInstance.post('/persons/', personData);
  return data;
});

export const updatePerson = createAsyncThunk('persons/updatePerson', async ({ personId, personData }) => {
  const { data } = await axiosInstance.put(`/persons/${personId}/`, personData);
  return data;
});

export const deletePerson = createAsyncThunk('persons/deletePerson', async (personId) => {
  await axiosInstance.delete(`/persons/${personId}/`);
  return personId;
});

// Slice for person
const personSlice = createSlice({
  name: 'persons',
  initialState: initialPersonState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        state.persons = action.payload;
        state.loading = false;
      })
      .addCase(fetchPersons.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerson.fulfilled, (state, action) => {
        state.person = action.payload;
        state.loading = false;
      })
      .addCase(fetchPerson.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPerson.fulfilled, (state, action) => {
        state.persons.push(action.payload);
        state.loading = false;
      })
      .addCase(createPerson.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updatePerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePerson.fulfilled, (state, action) => {
        state.persons = state.persons.map(person =>
          person.id === action.payload.id ? action.payload : person
        );
        state.loading = false;
      })
      .addCase(updatePerson.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deletePerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.persons = state.persons.filter(person => person.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default personSlice.reducer;
