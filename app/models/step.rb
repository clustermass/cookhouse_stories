# == Schema Information
#
# Table name: steps
#
#  id         :bigint(8)        not null, primary key
#  recipe_id  :integer          not null
#  num        :integer          not null
#  body       :text             not null
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Step < ApplicationRecord

  validates :body,:num,:recipe_id, presence: true

  belongs_to :recipe


end
