class CreateDifficulties < ActiveRecord::Migration[5.2]
  def change
    create_table :difficulties do |t|
      t.string :level, null: false
      t.timestamps
    end
    add_index :difficulties, :level
  end
end
