# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151220213405) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "counties", force: :cascade do |t|
    t.string   "spitcast_county", null: false
    t.integer  "region_id",       null: false
    t.string   "name",            null: false
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "counties", ["name"], name: "index_counties_on_name", unique: true, using: :btree
  add_index "counties", ["region_id"], name: "index_counties_on_region_id", using: :btree
  add_index "counties", ["spitcast_county"], name: "index_counties_on_spitcast_county", unique: true, using: :btree

  create_table "favorites", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "spot_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "favorites", ["spot_id"], name: "index_favorites_on_spot_id", using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "neighbor_relations", force: :cascade do |t|
    t.integer  "spot_id",     null: false
    t.integer  "neighbor_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "neighbor_relations", ["neighbor_id"], name: "index_neighbor_relations_on_neighbor_id", using: :btree
  add_index "neighbor_relations", ["spot_id"], name: "index_neighbor_relations_on_spot_id", using: :btree

  create_table "regions", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "description", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "regions", ["name"], name: "index_regions_on_name", unique: true, using: :btree

  create_table "spot_photos", force: :cascade do |t|
    t.integer  "spot_id"
    t.integer  "photo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "spot_photos", ["photo_id"], name: "index_spot_photos_on_photo_id", using: :btree
  add_index "spot_photos", ["spot_id"], name: "index_spot_photos_on_spot_id", using: :btree

  create_table "spots", force: :cascade do |t|
    t.integer  "spitcast_id",     null: false
    t.string   "spitcast_county", null: false
    t.float    "lat",             null: false
    t.float    "lng",             null: false
    t.string   "name",            null: false
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "county_name",     null: false
    t.integer  "county_id",       null: false
  end

  add_index "spots", ["lat"], name: "index_spots_on_lat", using: :btree
  add_index "spots", ["lng"], name: "index_spots_on_lng", using: :btree
  add_index "spots", ["spitcast_county"], name: "index_spots_on_spitcast_county", using: :btree
  add_index "spots", ["spitcast_id"], name: "index_spots_on_spitcast_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
