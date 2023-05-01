# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  author_id   :bigint           not null
#  business_id :bigint           not null
#  rating      :integer          not null
#  pricing     :integer          not null
#  body        :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord
    validates :author_id, :business_id, :rating, :body,
        presence: true
    # validates :author_id, uniqueness: { scope: :business_id }, messages: ["You have already submitted a review for this business."]
    validates :author_id, uniqueness: { scope: :business_id, message: "You have already submitted a review for this business." }


    has_many_attached :photos
    
    belongs_to :business,
        foreign_key: :business_id,
        class_name: :BusinessPage

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
    
end
