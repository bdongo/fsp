@reviews.each do |review|
    json.set! review.id do
        json.extract! review,  :id, :business_id, :author_id, :body, :rating
        json.author_f_name review.author.f_name
        json.author_l_name review.author.l_name
        json.business_name review.business.name
        json.photos review.photos.attached? ? review.photos.map { |file| url_for(file) } : nil
    end
end
