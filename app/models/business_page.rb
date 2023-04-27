# == Schema Information
#
# Table name: business_pages
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  hours       :json             not null
#  about       :text
#  phone_num   :string           not null
#  address     :json             not null
#  postal_code :string           not null
#  location    :json             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class BusinessPage < ApplicationRecord
    validates :name, :hours, :phone_num, :address, :postal_code, :location,
        presence: true

    has_many_attached :photos

    has_many :reviews,
        foreign_key: :business_id,
        class_name: :Review,
        dependent: :destroy

    has_many :reviewers,
    through: :reviews,
    source: :author

    
end
