class County < ActiveRecord::Base
  belongs_to :region
  has_many :spots,
  	foreign_key: :spitcast_county,
  	primary_key: :spitcast_county

  has_many :spot_photos, through: :spots

end
