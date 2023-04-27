# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  f_name          :string           not null
#  l_name          :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :username,
        length: { in: 3..20 },
        uniqueness: true
    validates :email,
        length:  { in: 3..200 },
        uniqueness: true, 
        format: { with: URI::MailTo::EMAIL_REGEXP}
    validates :password, 
        length: { in: 6..200 }, 
        allow_nil: true
    validates :session_token,
        presence:true,
        uniqueness: true
    validates :f_name, :l_name,
        presence: true
    before_validation :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)

        if user&.authenticate(password) 
            user
        else
            nil
        end
    end

    def reset_session_token
        self.session_token = generate_unique_session_token
        self.save
        self.session_token
    end

    def has_reviewed?(business)
        reviews.exists?(business_id: business.id)
    end

    has_many :reviews,
    foreign_key: :author_id,
    class_name: :Review,
    dependent: :destroy

    has_many :reviewed_businesses,
    through: :reviews,
    source: :business

    private
    def generate_unique_session_token 
        token = SecureRandom.urlsafe_base64
        while User.exists?(session_token: token)
            token = SecureRandom.urlsafe_base64
        end
        token
    end

    def ensure_session_token 
        self.session_token ||= generate_unique_session_token
    end
    
end
