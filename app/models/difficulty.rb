# == Schema Information
#
# Table name: difficulties
#
#  id         :bigint(8)        not null, primary key
#  level      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class Difficulty < ApplicationRecord

validates :level, presence: true

has_many :recipes
before_validation :capitalize

def capitalize
  self.level = self.level.capitalize  if self.level != ""
end

end
