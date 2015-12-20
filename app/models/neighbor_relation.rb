class NeighborRelation < ActiveRecord::Base
	validates :spot_id, :neighbor_id, presence: true
	validates :neighbor_id, uniqueness: {scope: [:spot_id]}

	belongs_to :spot
	belongs_to :neighbor,
		foreign_key: :neighbor_id,
		class_name: "Spot"
end
