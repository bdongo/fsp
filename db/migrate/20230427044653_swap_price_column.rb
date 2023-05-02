class SwapPriceColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :pricing 
    add_column :business_pages, :pricing, :integer, default: 2
    change_column_null :business_pages, :pricing, false
  end
end
