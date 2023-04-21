class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']
    
    def create
        @user = User.new(user_params)
        if @user&.save
            login(@user)
        else

        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :f_name, :l_name, :password)
    end
end
