class NullConstraintRegionIdforCounty < ActiveRecord::Migration
  def change
  	change_column :counties, :region_id, :integer, null: false
  end
end
