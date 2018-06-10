Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
      resource :users, only: [:create]
      resource :session, only: [:create, :destroy]
      resources :recipes
    end

    root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
