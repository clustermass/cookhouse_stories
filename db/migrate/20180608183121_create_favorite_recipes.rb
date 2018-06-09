class CreateFavoriteRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_recipes do |t|
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false
      t.timestamps
    end
    add_index :favorite_recipes, [:user_id, :recipe_id], unique: true
  end
end
