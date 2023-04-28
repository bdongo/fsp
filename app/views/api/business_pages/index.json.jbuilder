@bizs.each do |biz|
    json.set! biz.id do
        json.extract! biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location
        json.photos biz.photos.map { |file| url_for(file) }
    end
end
