class Region < ActiveRecord::Base
  has_many :counties
  has_many :spots, through: :counties
  has_many :spot_photos, through: :spots
end
