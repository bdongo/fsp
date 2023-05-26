json.user do
          json.extract! @user, :id, :email, :username, :f_name, :l_name
          json.reviews @user.show_business_ids
end