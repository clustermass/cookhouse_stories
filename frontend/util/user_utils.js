export const createUser = (user) => (
  $.ajax({
    method: 'POST',
    url: 'api/users',
    data: {user: user}
  })
)

export const getUsers = () => (
  $.ajax({
    method: 'GET',
    url: 'api/users'
  })
)

export const getUser = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  })
)
