class CreateBusinessPages < ActiveRecord::Migration[7.0]
  def change
    create_table :business_pages do |t|
      t.string :name, null: false
      t.json :hours, null: false
      t.text :about, null: false
      t.string :phone_num, null: false
      t.json :address, null: false
      t.string :postal_code, null: false
      t.json :location, null: false
      t.timestamps
    end
  end
end
