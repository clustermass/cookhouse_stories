class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.string :main_picture_url, null: false
      t.integer :cooking_time, null: false
      t.integer :difficulty_id, null: false
      t.integer :cuisine_id, null: false
      t.integer :category_id, null: false
      t.integer :main_ingredient_id, null: false
      t.integer :diet_id, null: false
      t.timestamps
    end
    add_index :recipes, :title
    add_index :recipes, :cooking_time
    add_index :recipes, :difficulty_id
    add_index :recipes, :cuisine_id
    add_index :recipes, :main_ingredient_id
    add_index :recipes, :diet_id

  end
end
