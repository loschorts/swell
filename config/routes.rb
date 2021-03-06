Rails.application.routes.draw do

  resource :session, defaults: {format: :json}, only: [:new, :create, :destroy, :show]

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create, :update, :destroy, :show]
    resources :favorites, only: [:create]
    resources :spots, only: [:show, :index]
    resources :counties, only: [:show, :index] do
      resources :spots, only: [:index]
    end
    resources :regions, only: [:show, :index] do 
      resources :counties, only: [:index]
      resources :spots, only: [:index]
    end
  end

  root to: 'pages#home'
  get 'api/search-terms', to: 'pages#search_terms', defaults: {format: :json}
  delete 'api/favorites/:spot_id', to: 'api/favorites#destroy', defaults: {format: :json}
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
