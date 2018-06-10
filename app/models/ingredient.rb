# == Schema Information
#
# Table name: ingredients
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#



class Ingredient < ApplicationRecord
  validates :name, presence: true

  has_many :possible_meals,
  primary_key: :id,
  foreign_key: :main_ingredient_id,
  class_name: :Recipe

  has_many :ingredient_amounts

  has_many :measurings,
  through: :ingredient_amounts,
  source: :measuring,
  class_name: :Measuring

  has_many :recipes,
  through: :ingredients_joins,
  source: :recipe,
  class_name: :Recipe

end
