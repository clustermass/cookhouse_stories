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

require 'test_helper'

class IngredientsJoinTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
