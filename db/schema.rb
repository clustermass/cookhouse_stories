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

ActiveRecord::Schema.define(version: 2018_06_08_183411) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "recipe_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["body"], name: "index_comments_on_body"
    t.index ["recipe_id"], name: "index_comments_on_recipe_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "cuisines", force: :cascade do |t|
    t.string "sort", null: false
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country"], name: "index_cuisines_on_country"
    t.index ["sort"], name: "index_cuisines_on_sort"
  end

  create_table "diets", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_diets_on_name"
  end

  create_table "difficulties", force: :cascade do |t|
    t.string "level", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["level"], name: "index_difficulties_on_level"
  end

  create_table "favorite_recipes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "recipe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "recipe_id"], name: "index_favorite_recipes_on_user_id_and_recipe_id", unique: true
  end

  create_table "ingredient_amounts", force: :cascade do |t|
    t.integer "recipe_id", null: false
    t.integer "ingredient_id", null: false
    t.integer "amount", null: false
    t.integer "measuring_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id", "ingredient_id"], name: "index_ingredient_amounts_on_recipe_id_and_ingredient_id", unique: true
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_ingredients_on_name"
  end

  create_table "measurings", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_measurings_on_name", unique: true
  end

  create_table "recipes", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "title", null: false
    t.string "main_picture_url", null: false
    t.integer "cooking_time", null: false
    t.integer "difficulty_id", null: false
    t.integer "cuisine_id", null: false
    t.integer "category_id", null: false
    t.integer "main_ingredient_id", null: false
    t.integer "diet_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cooking_time"], name: "index_recipes_on_cooking_time"
    t.index ["cuisine_id"], name: "index_recipes_on_cuisine_id"
    t.index ["diet_id"], name: "index_recipes_on_diet_id"
    t.index ["difficulty_id"], name: "index_recipes_on_difficulty_id"
    t.index ["main_ingredient_id"], name: "index_recipes_on_main_ingredient_id"
    t.index ["title"], name: "index_recipes_on_title"
  end

  create_table "steps", force: :cascade do |t|
    t.integer "recipe_id", null: false
    t.integer "num", null: false
    t.text "body", null: false
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["body", "recipe_id"], name: "index_steps_on_body_and_recipe_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "name"
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "author_id", null: false
    t.string "title"
    t.integer "video_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id", "recipe_id"], name: "index_videos_on_author_id_and_recipe_id"
  end

end
