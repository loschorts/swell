class CreateSpotPhotos < ActiveRecord::Migration
  def change
    create_table :spot_photos do |t|
      t.integer :spot_id
      t.integer :photo_id
      t.timestamps null: false
    end

    add_index :spot_photos, :spot_id
    add_index :spot_photos, :photo_id

  end
end
