# == Schema Information
#
# Table name: ingredients_joins
#
#  id                :bigint(8)        not null, primary key
#  recepie_id        :integer          not null
#  ingredient_id     :integer          not null
#  ingridient_amount :integer          not null
#  measuring_id      :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class IngredientsJoin < ApplicationRecord
validates :recepie_id, :ingredient_id, :ingridient_amount, :measuring_id, presence: true
validates :ingredient_id, uniqueness: { scope: :recepie_id }

  belongs_to :measuring
  belongs_to :recipe
  belongs_to :ingredient

end
