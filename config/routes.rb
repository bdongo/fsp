Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/demo', to: 'application#demo'

  namespace :api, defaults: { format: JSON } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :business_pages, only: [:show, :index,]
  end

  get '*path', to: "static_pages#frontend_index", constraints: -> (req) {!req.xhr? && req.format.html?}
end
