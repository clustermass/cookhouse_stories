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

require 'test_helper'

class RecipeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
