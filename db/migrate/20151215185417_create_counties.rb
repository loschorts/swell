class CreateCounties < ActiveRecord::Migration
  def change
    create_table :counties do |t|
    	#api id
    	t.string :spitcast_county, null: false
    	t.integer :region_id
    	#static data
    	t.string :name, null: false
    	t.string :description

    	t.timestamps
    end

    add_index :counties, :spitcast_county, unique: true
    add_index :counties, :name, unique: true
    add_index :counties, :region_id
  end
end
