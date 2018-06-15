class ColumnsController < ApplicationController

  def create
    @column = Column.create! create_params
    MessageBroadcastJob.perform_later column: @column, name: 'COLUMN_CREATE'
    render json: {column: @column, success: true}
  end

  def show
    @column = Column.find params[:id]
    render json: {column: @column, success: true}
  end

  def update
    @column = Column.find params[:id]
    @column.update update_params
    MessageBroadcastJob.perform_later column: @column, name: 'COLUMN_UPDATE'
    render json: {column: @column, success: true}
  end

  def destroy
    @column = Column.find params[:id]
    @column.destroy
    MessageBroadcastJob.perform_later column: @column.as_json(except: [:created_at, :updated_at]), name: 'COLUMN_REMOVE'
    render json: {column: @column, success: true}
  end

  private

  def create_params
    params.permit :title, :bord_id
  end

  def update_params
    params.permit :title
  end


end
