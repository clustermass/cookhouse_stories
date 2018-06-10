# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  recipe_id  :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#



class Comment < ApplicationRecord
  validates :user_id, :recipe_id, :body, presence: true


  belongs_to :user
  belongs_to :recipe

end
