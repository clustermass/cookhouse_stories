class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.integer :recipe_id, null: false
      t.integer :author_id, null: false
      t.string :title
      t.string :video_url, null: false
      t.timestamps
    end
    add_index :videos, [:author_id, :recipe_id]
  end
end
