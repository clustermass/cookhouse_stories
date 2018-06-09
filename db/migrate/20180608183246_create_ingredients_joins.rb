class CreateIngredientsJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients_joins do |t|
      t.integer :recepie_id, null: false
      t.integer :ingredient_id, null: false
      t.integer :ingridient_amount, null: false
      t.integer :measuring_id, null: false
      t.timestamps
    end
      add_index :ingredients_joins, [:recepie_id,:ingredient_id], unique: true
  end
end
