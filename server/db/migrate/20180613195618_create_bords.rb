class CreateBords < ActiveRecord::Migration[5.2]
  def change
    create_table :bords do |t|
      t.string :title,  limit: 128
      t.string :url,    limit: 16, index: true, uniq: true

      t.timestamps
    end
  end
end
