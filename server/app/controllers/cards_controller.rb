class CardsController < ApplicationController

  def create
    @card = Card.create! create_params
    MessageBroadcastJob.perform_later card: @card, name: 'CARD_CREATE'
    render json: {card: @card, success: true}
  end

  def show
    @card = Card.find params[:id]
    render json: {card: @card, success: true}
  end

  def update
    @card = Card.find params[:id]
    @card.update update_params
    MessageBroadcastJob.perform_later card: @card.as_json(methods: :old_column_id, except: [:created_at, :updated_at]), name: 'CARD_UPDATE'

    render json: {card: @card, success: true}
  end

  def destroy
    @card = Card.find params[:id]
    @card.destroy
    MessageBroadcastJob.perform_later card: @card.as_json(except: [:created_at, :updated_at]), name: 'CARD_REMOVE'

    render json: {card: @card, success: true}
  end

  private

  def create_params
    params.permit :title, :column_id
  end

  def update_params
    params.permit :title, :column_id
  end

end
