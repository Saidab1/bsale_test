class Category < ApplicationRecord
  self.table_name = "category"

  has_many :products, foreign_key: "category"
end
