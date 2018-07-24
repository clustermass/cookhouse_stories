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
  validates :sort, :country, presence: true

  has_many :recipes

  before_validation :capitalize

  def capitalize
    self.sort = self.sort.capitalize  if self.sort != ""
    self.country = self.country.capitalize  if self.country != ""

  end
end
