class AddCountyColumntoSpots < ActiveRecord::Migration
  def change
  	add_column :spots, :county_name, :string, null: false
  end
end
