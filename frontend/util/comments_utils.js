export const submitComment = (comment) =>(
  $.ajax({
  url: '/api/comments/',
  method: 'POST',
  data: {comment:comment}
  })

)
