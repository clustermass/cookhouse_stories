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


class Video < ApplicationRecord
  validates :video_url,:recipe_id, presence: true

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

  belongs_to :recipe

end
