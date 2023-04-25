class ChangeAboutColumnToOptional < ActiveRecord::Migration[7.0]
  def change
    change_column_null :business_pages, :about, true
  end
end
