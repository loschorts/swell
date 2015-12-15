class CreateSpots < ActiveRecord::Migration
  def change
    create_table :spots do |t|
    	#api ids
    	t.integer :spitcast_id, null: false
    	t.string :spitcast_county, null: false

    	#static data
    	t.integer :latitude, null: false
    	t.integer :longitude, null: false
    	t.string :name, null: false
    	t.string :description, null: false

      t.timestamps
    end

    add_index :spots, :spitcast_id, unique: true
    add_index :spots, :spitcast_county
    add_index :spots, :latitude
    add_index :spots, :longitude
  end
end
