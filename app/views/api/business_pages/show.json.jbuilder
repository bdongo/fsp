
json.extract! @biz, :id, :name, :hours, :about, :phone_num, :address, :postal_code, :location
json.photos @biz.photos.map { |file| url_for(file) }

json.array! @biz.reviews do |review|
  json.extract! review, :id, :business_id, :author_id, :body
end

json.array! @biz.reviewers do |reviewer|
  json.extract! reviewer, :id, :username, :f_name, :l_name, :email
end