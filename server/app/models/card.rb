class Card < ApplicationRecord
  belongs_to :column
  has_one    :bord,  through: :column

  attr_accessor :old_column_id

  validates :title,  presence: true
  validates :column, presence: true

  before_save :set_old_column
  def set_old_column
    self.old_column_id = column_id_was if column_id_changed?
  end

end
