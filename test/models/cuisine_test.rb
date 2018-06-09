# == Schema Information
#
# Table name: cuisines
#
#  id         :bigint(8)        not null, primary key
#  sort       :string           not null
#  country    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class CuisineTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
