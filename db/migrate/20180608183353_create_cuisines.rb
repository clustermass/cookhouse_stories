class CreateCuisines < ActiveRecord::Migration[5.2]
  def change
    create_table :cuisines do |t|
      t.string :sort, null: false
      t.string :country
      t.timestamps
    end
    add_index :cuisines, :sort
    add_index :cuisines, :country
  end
end
