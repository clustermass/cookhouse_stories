class CreateDiets < ActiveRecord::Migration[5.2]
  def change
    create_table :diets do |t|
      t.string :name, null: false
      t.timestamps
    end
    add_index :diets, :name
  end
end
