import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export type PlayerState = {
  course: Course | null
  currentModuleIndex: number,
  currentLessonIndex: number
}

const myState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0
}

/**
 * 1) 'Thunk' is intended for usage with async requests (HTTP requests, promises, etc.).
 * 
 * It is how we define an async action.
 * 
 * Obs.: We cannot have async functions inside our 'reducers' object. Each action MUST BE a pure function and without side effects.
 * 
 * 2) 'thunks' are not a native feature of redux; internally in the Redux Toolkit, it is handled by the redux-thunk library.
 * 
 * Therefore, by default, Redux does not understand 'loadCourse' is an action. 'useAppDispatch' is a solution.
 */
export const loadCourse = createAsyncThunk(
  'player/load', // action name
  async() => {
    const response = await api.get('/courses/1')

    return response.data
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState: myState,
  reducers: {
    /**
     * "payload[0]" refers to the first property in the payload, that is a value related to "module".
     */
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },

    /**
     * 'next' is meant only to play the next video. It does not receive a payload, therefore no action is needed.
     */
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if(nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if(nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    },
  },

  extraReducers(builder) {
    /*
      "I want to do something when 'loadCourse' is fulfilled".
    */
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
    })
  }
})

export const player = playerSlice.reducer

export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}