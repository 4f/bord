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

ActiveRecord::Schema.define(version: 2018_06_13_195758) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bords", force: :cascade do |t|
    t.string "title", limit: 128
    t.string "url", limit: 16
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["url"], name: "index_bords_on_url"
  end

  create_table "cards", force: :cascade do |t|
    t.string "title", limit: 128
    t.bigint "column_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["column_id"], name: "index_cards_on_column_id"
  end

  create_table "columns", force: :cascade do |t|
    t.string "title", limit: 128
    t.bigint "bord_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bord_id"], name: "index_columns_on_bord_id"
  end

  add_foreign_key "cards", "columns"
  add_foreign_key "columns", "bords"
end
