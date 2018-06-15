class Bord < ApplicationRecord
  has_many :columns
  has_many :cards, through: :columns

  before_create :generate_url
  def generate_url
    while Bord.find_by_url( new_url = rand(2<<30).to_s(36) ) do; end
    self.url = new_url
  end


end
