# == Schema Information
#
# Table name: categories
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#



class Category < ApplicationRecord
  validates :name, presence: true

  has_many :recipes

  before_validation :capitalize

  def capitalize
    self.name = self.name.capitalize  if self.name != ""

  end
end
