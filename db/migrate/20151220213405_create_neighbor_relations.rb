class CreateNeighborRelations < ActiveRecord::Migration
  def change
    create_table :neighbor_relations do |t|
      t.integer :spot_id, null: false
      t.integer :neighbor_id, null: false
      t.timestamps
    end
    add_index :neighbor_relations, :spot_id
    add_index :neighbor_relations, :neighbor_id
  end
end
