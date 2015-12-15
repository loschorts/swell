class SpotPhoto < ActiveRecord::Base
  belongs_to :spot
  has_one :county, through: :spot
  has_one :region, through: :county
end
