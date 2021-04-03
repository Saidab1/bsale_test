class CategoriesController < ApplicationController
  #Get /categories
  def index 
    categories = Category.order('name')
    render json: categories
  end
end
