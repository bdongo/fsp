class AddIndexToTagandBusinessId < ActiveRecord::Migration[7.0]
  def change
    add_index :business_tags, [:tag_id, :business_id], unique: true
  end
end
