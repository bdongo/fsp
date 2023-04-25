# == Schema Information
#
# Table name: business_pages
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  hours       :json             not null
#  about       :text             not null
#  phone_num   :string           not null
#  address     :json             not null
#  postal_code :string           not null
#  location    :json             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class BusinessPage < ApplicationRecord
    validates :name, :hours, :about, :phone_num, :address, :postal_code, :location,
        presence: true
end
