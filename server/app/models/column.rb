class Column < ApplicationRecord
  belongs_to :bord
  has_many   :cards, dependent: :destroy

  validates :title,  presence: true
  validates :bord,   presence: true

end
