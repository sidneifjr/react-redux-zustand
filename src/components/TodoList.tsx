import { useAppSelector } from '../store'

export function TodoList() {
  // From my "store" set at the ReduxProvider, I want to return a specific type of data.
  const todos = useAppSelector(store => {
    return store.todo
  })

  console.log(todos)

  return (
    <ul>
      {
        todos.map(todo => <li key={todo}>{todo}</li>)
      }
    </ul>
  )
}