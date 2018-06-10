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

  belongs_to :ingredients_amounts,
  optional: true


end
