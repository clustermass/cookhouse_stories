class CreateMeasurings < ActiveRecord::Migration[5.2]
  def change
    create_table :measurings do |t|
      t.string :name, null: false
      t.timestamps
    end
    add_index :measurings, :name, unique: true
  end
end
