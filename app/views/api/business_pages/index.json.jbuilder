json.businesses do
    @bizs.each do |biz|
        json.set! biz.id do
            json.extract! biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location
            json.photos biz.photos.map { |file| url_for(file) }
        end
    end
end

json.users do
     @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :username, :f_name, :l_name
    end
  end
end

json.reviews do 
    @reviews.each do |review|
        json.set! review.id do
            json.extract! review,  :id, :business_id, :author_id, :body
        end
    end
end

