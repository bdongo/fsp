class Api::BusinessPagesController < ApplicationController
    def show
        id = params[:id]
        @biz = BusinessPage.find_by(id: id)
        if @biz
            render :show
        else
            render json: { errors: ["We’re sorry. We can’t find the page you’re looking for."] }, status: 404
        end  
    end

    def index 
        @bizs = BusinessPage.all
        @users = User.all
        @reviews = Review.all
        render :index
    end
end
