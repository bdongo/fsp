
json.extract! @biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location, :photos
# json.photos @biz.photos.attached? ? @biz.photos.url : nil
json.photos @biz.photos.map { |file| url_for(file) }
