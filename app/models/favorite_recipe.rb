# == Schema Information
#
# Table name: favorite_recipes
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  recipe_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#



class FavoriteRecipe < ApplicationRecord
  validates :user_id, :recipe_id, presence: true

  validates :recipe_id, uniqueness: { scope: :user_id }

  belongs_to :user

  belongs_to :recipe


end
