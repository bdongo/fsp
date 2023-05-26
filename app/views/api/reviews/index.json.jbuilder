@reviews.each do |review|
    json.set! review.id do
        json.extract! review, :id, :business_id, :author_id, :body, :rating
        json.photos review.photos.attached? ? review.photos.map { |file| url_for(file) } : nil
    end
end