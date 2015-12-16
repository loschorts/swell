class AddCountyIdtoSpots < ActiveRecord::Migration
  def change
  	add_column :spots, :county_id, :integer, null: false
  end
end
