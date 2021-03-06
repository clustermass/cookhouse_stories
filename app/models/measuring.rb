# == Schema Information
#
# Table name: measurings
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class Measuring < ApplicationRecord
  validates :name, presence: true

  has_many :ingredient_amounts
before_validation :lowercase

  def lowercase
    self.name = self.name.downcase  if self.name != ""
  end
end
