class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
      t.integer :recipe_id, null: false
      t.integer :num, null: false
      t.text :body, null: false
      t.string :image
      t.timestamps
    end
    add_index :steps, [:body, :recipe_id]
  end
end
