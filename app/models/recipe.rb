# == Schema Information
#
# Table name: recipes
#
#  id                 :bigint(8)        not null, primary key
#  author_id          :integer          not null
#  title              :string           not null
#  main_picture_url   :string           not null
#  cooking_time       :integer          not null
#  difficulty_id      :integer          not null
#  cuisine_id         :integer          not null
#  category_id        :integer          not null
#  main_ingredient_id :integer          not null
#  diet_id            :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#


class Recipe < ApplicationRecord

validates :author_id, :title, :main_picture_url, :cooking_time, :difficulty_id, :cuisine_id, :category_id,
 :main_ingredient_id, :diet_id, presence: true

belongs_to :author,
primary_key: :id,
foreign_key: :author_id,
class_name: :User

has_one :video

has_many :comments

has_many :commenters,
through: :comments,
source: :user,
class_name: :User


# Ingredients trough join table
has_many :ingredient_amounts

has_many :ingredients,
through: :ingredient_amounts,
source: :ingredient,
class_name: :Ingredient

# users likes
has_many :favorite_recipes

has_many :followers,
through: :favorite_recipes,
source: :user
# class_name: :User
#

belongs_to :difficulty
belongs_to :cuisine
belongs_to :category

belongs_to :main_ingredient,
primary_key: :id,
foreign_key: :main_ingredient_id,
class_name: :Ingredient

belongs_to :diet
has_many :steps

end
