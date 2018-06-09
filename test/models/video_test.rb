# == Schema Information
#
# Table name: videos
#
#  id         :bigint(8)        not null, primary key
#  recipe_id  :integer
#  author_id  :integer          not null
#  title      :string
#  video_url  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class VideoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
