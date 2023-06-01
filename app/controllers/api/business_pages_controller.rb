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
        query = params[:query]
        picture = params[:require]
        
        if query 
            @bizs = BusinessPage.joins(:tags)
                        .where("name ILIKE ? OR tags.tag_name ILIKE ?", "%#{query}%", "%#{query}%")
            @reviews = Review.all
            render :index
            
        elsif picture
            @bizs = BusinessPage.all
            @reviews = Review.joins(:photos_attachments).distinct
            render :index
        else
            @bizs = BusinessPage.all
            @reviews = Review.all
            render :index
        end
    end


end
