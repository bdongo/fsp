class CreateBusinessTags < ActiveRecord::Migration[7.0]
  def change
    create_table :business_tags do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :business, null: false, foreign_key: { to_table: :business_pages}
      t.timestamps
    end
  end
end
