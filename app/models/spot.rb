class Spot < ActiveRecord::Base
  has_many :spot_photos

  belongs_to :county,
  	primary_key: :spitcast_county,
  	foreign_key: :spitcast_county

  has_one :region, through: :county

  has_many :favorites

  has_many :users, through: :favorites

  has_many :neighbor_relations

  has_many :neighbors,
  	through: :neighbor_relations,
  	source: :neighbor

end
