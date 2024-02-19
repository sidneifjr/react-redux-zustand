import { FormEvent, useState } from "react"

import { useDispatch } from 'react-redux'
import { add } from "../store"

export function AddTodo() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()

  function handleNewTodo(e: FormEvent) {
    e.preventDefault()

    /**
     * 1) 'dispatch' is the trigger for the action.
     * 
     * 2) The value passed as a parameter in "add" is called a payload.
     *  */ 
    dispatch(add({
      newTodo,
    }))

    setNewTodo('')
  }

  return (
    <form onSubmit={handleNewTodo}>
      <input type="text" placeholder="Novo to-do" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  )
}