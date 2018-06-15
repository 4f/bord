Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'

  resource :bords,   only: [:create, :update, :show]
  resource :cards,   only: [:create, :update, :show, :destroy]
  resource :columns, only: [:create, :update, :show, :destroy]

end
