class County < ActiveRecord::Base
  belongs_to :region
  
  has_many :spots,
  	primary_key: :spitcast_county,
  	foreign_key: :spitcast_county

  has_many :spot_photos, through: :spots

end
