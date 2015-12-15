class Spot < ActiveRecord::Base
  has_many :spot_photos

  belongs_to :county,
  	foreign_key: :spitcast_county,
  	primary_key: :spitcast_county

  has_one :region, through: :county

  has_many :favorites

  has_many :users, through: :favorites

  def forecast
  	
  end
end
