class BordsController < ApplicationController

  def show
    @bord = Bord.find_by_url params[:url]
    if @bord
      render json: {
        success: true,
        bord: @bord,
        cards: @bord.cards,
        columns: @bord.columns,
        message: "bord loaded"
      }
    else
      render json: {error: "not found", success: false}
    end
  end

  def create
    @bord = Bord.create! create_params
    render json: {bord: @bord, success: true}
  end

  def update
    @bord = Bord.find_by_url params[:url]
    @bord.update update_params if @bord
    render json: {bord: @bord, success: true}
  end

  private

  def create_params
    params.permit :title
  end

  def update_params
    params.permit :title
  end

end
