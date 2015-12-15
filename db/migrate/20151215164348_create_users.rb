class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string :username, null: false
    	t.string :password_digest, null: false
    	t.string :session_token, null: false

    	t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true

    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :spot_id, null: false

      t.timestamps
    end

    add_index :favorites, :spot_id
    add_index :favorites, :user_id

    create_table :preferences do |t|
      t.integer :user_id, null: false
      t.integer :units, default: "standard"

      t.timestamps
    end

    add_index :preferences, :user_id, unique: true
  end
end
