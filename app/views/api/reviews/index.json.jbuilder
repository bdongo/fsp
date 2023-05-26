@reviews.each do |review|
    json.set! review.id do
        json.extract! review, :id, :business_id, :author_id, :body, :rating
        json.photoUrl post.photos.attached? ? post.photos.url : nil
    end
end