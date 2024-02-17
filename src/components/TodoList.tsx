import { useSelector } from 'react-redux'

export function TodoList() {
  // From my "store" set at the ReduxProvider, I want to return certain types of data.
  const todos = useSelector(store => {
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