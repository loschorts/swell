class SpotColumnAdjustments < ActiveRecord::Migration
  def change
  	change_column :spots, :latitude, :float
  	change_column :spots, :longitude, :float

	rename_column :spots, :latitude, :lat
	rename_column :spots, :longitude, :lng


  end
end
