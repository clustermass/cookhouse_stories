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



class Cuisine < ApplicationRecord
  validates :sort, presence: true

  has_many :recipes
end
