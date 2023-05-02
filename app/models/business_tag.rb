# == Schema Information
#
# Table name: business_tags
#
#  id          :bigint           not null, primary key
#  tag_id      :bigint           not null
#  business_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class BusinessTag < ApplicationRecord
    validates :tag_id, :business_id, presence: true
    validates :tag_id, uniqueness: { scope: :business_id }


    belongs_to :business,
        foreign_key: :business_id,
        class_name: :BusinessPage

    belongs_to :tag,
        foreign_key: :tag_id,
        class_name: :Tag
end
