class Product < ApplicationRecord
  self.table_name = "product"

  belongs_to :category_record, foreign_key: "category", class_name: 'Category'
end
