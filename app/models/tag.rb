# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  tag_name   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
    validates :tag_name, presence: true, uniqueness: true

    has_many :business_tags,
        foreign_key: :tag_id,
        class_name: :BusinessTag,
        dependent: :destroy

    has_many :businesses,
        through: :business_tags,
        source: :business
end
