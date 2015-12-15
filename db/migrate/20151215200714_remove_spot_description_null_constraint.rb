class RemoveSpotDescriptionNullConstraint < ActiveRecord::Migration
  def change
  	change_column :spots, :description, :string, null: true
  end
end
