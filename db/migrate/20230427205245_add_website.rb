class AddWebsite < ActiveRecord::Migration[7.0]
  def change
    add_column :business_pages, :website, :string
  end
end
