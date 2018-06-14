class Api::CommentsController < ApplicationController

  before_action :require_logged_in


  def create
    @comment = Comment.new(comments_params)
    if @comment.save
      render "api/comments/create"
    else
      errors = @comment.errors.full_messages
      render json: errors, status: 422
    end

  end


  def comments_params
    params.require(:comment).permit(:user_id,:recipe_id,:body)
  end
end
