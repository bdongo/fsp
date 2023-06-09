
# json.extract! @biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location
# json.photos @biz.photos.map { |file| url_for(file) }

json.business do
  json.extract! @biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location, :pricing
  json.average_rating @biz.average_rating
  json.tags @biz.tags.map {|tag| tag.tag_name}
  json.photos @biz.photos.map { |file| url_for(file) }
end

json.reviews do
  @biz.reviews.each do |review|
     json.set! review.id do
        json.extract! review, :id, :business_id, :author_id, :body, :rating
        json.author_f_name review.author.f_name
        json.author_l_name review.author.l_name
        json.business_name review.business.name
        json.photos review.photos.attached? ? review.photos.map { |file| url_for(file) } : nil
    end
  end
end

json.reviewers do
  @biz.reviewers.each do |reviewer|
     json.set! reviewer.id do
        json.extract! reviewer, :id, :username, :f_name, :l_name, :email
    end
  end
end