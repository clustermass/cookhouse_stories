class CreateIngredientAmounts < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredient_amounts do |t|
      t.integer :recipe_id, null: false
      t.integer :ingredient_id, null: false
      t.integer :amount, null: false
      t.integer :measuring_id, null: false
      t.timestamps
    end
      add_index :ingredient_amounts, [:recipe_id,:ingredient_id], unique: true
  end
end
