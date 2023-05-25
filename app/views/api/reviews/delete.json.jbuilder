json.business do
  json.extract! @biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location, :pricing
  json.average_rating @biz.average_rating
  json.tags @biz.tags.map {|tag| tag.tag_name}
  json.photos @biz.photos.map { |file| url_for(file) }
end