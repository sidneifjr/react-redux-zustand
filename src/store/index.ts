import { configureStore, createSlice } from '@reduxjs/toolkit'

/**
 * Slice: contains data of certain types of state.
 * 
 * You could say it's categorizing kinds of data.
 */
const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer café', 'Estudar Redux', 'Aprender Zustand'],

  reducers: {}
})

export const store = configureStore({
  /**
   * Reducer: data that's going to be shared across all components in our application.
   * 
   * It's possible to have several: a reducer for my shopping cart, another for authentication, etc, with the intent of organizing each type of state in its own category.
   *  */ 
  reducer: {
    todo: todoSlice.reducer
  }
})