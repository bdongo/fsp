class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :author, null: false, foreign_key: { to_table: :users}
      t.references :business, null: false, foreign_key: { to_table: :business_pages}
      t.integer :rating, null: false
      t.integer :pricing, null: false
      t.text :body, null: false
      t.timestamps
    end
     add_index :reviews, [:author_id, :business_id], unique: true
  end
end
