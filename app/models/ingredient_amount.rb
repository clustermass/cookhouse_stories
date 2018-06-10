# == Schema Information
#
# Table name: ingredient_amounts
#
#  id            :bigint(8)        not null, primary key
#  recipe_id     :integer          not null
#  ingredient_id :integer          not null
#  amount        :integer          not null
#  measuring_id  :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class IngredientAmount < ApplicationRecord
validates :recipe_id, :ingredient_id, :ingredient_amount, :measuring_id, presence: true
validates :ingredient_id, uniqueness: { scope: :recepie_id }

  belongs_to :measuring

  belongs_to :recipe
  
  belongs_to :ingredient

end
