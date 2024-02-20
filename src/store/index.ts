import { player } from './slices/player';
import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

/**
 * Slice: contains data of certain types of state.
 * 
 * You could say it's categorizing kinds of data.
 */

/**
 * Reducers: actions that our interface is able to perform and change our state (triggerable by the user).
 */


// Store: global state. Can be split into several slices.
export const store = configureStore({
  /**
   * Reducer: data that's going to be shared across all components in our application.
   * 
   * It's possible to have several: a reducer for my shopping cart, another for authentication, etc, with the intent of organizing each type of state in its own category.
   *  */ 
  reducer: {
    player
  }
})

// TypeScript's ReturnType gives you the type from the value returned by the function.
export type RootState = ReturnType<typeof store.getState>

// Apply typing to useSelector.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector