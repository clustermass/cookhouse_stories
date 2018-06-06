
export const createSession = (cred) =>(
  $.ajax({
    method: 'POST',
    url:'api/session',
    data: {user:cred}
  })
)

export const destroySession = () => (
  $.ajax({
    method: 'DELETE',
    url: 'api/session'
  })
)
