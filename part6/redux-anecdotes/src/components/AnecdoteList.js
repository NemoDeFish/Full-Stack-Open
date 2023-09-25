import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => 
    filter === '' 
      ? anecdotes
      : anecdotes.filter((anecdote) => new RegExp(filter, "gi").test(anecdote.content))
  )

  const anecdotesToSort = [...anecdotes]
  
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  const byVotes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      {anecdotesToSort.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList