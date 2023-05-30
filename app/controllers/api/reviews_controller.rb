class Api::ReviewsController < ApplicationController
    before_action :require_login, only: [:update, :destroy]

    def index
        @reviews = Review.all
        render :index
    end
    def create
        @review = Review.new(review_params)

        if @review.save
            render json: { errors: ['successful'] }
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        id = params[:id]
        @review = Review.find_by(id: id)
        if @review&.destroy
            @biz = BusinessPage.find_by(id: @review.business_id)
            render :delete
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        id = params[:id]
        @review = Review.find_by(id: id)
        @biz = BusinessPage.find_by(id: @review.business_id)
        if @review
            render '/api/business_pages/show'
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        id = params[:id]
        @review = Review.find_by(id: id)
        @biz = BusinessPage.find_by(id: @review.business_id)
        if params[:review][:remove_picture_idx]
            remove_picture_index = params[:review][:remove_picture_idx]
            p "arr"
            p remove_picture_index
            remove_picture_index.reverse_each do |num| 
                idx = num.to_i
                @review.photos[idx].purge_later
            end
        end

        if @review&.update(review_params)
            render '/api/business_pages/show'
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end



    private
    def review_params
        params.require(:review).permit(:author_id, :business_id, :body, :rating, photos: [])
    end
end