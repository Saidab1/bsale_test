class ProductsController < ApplicationController

  #GET /products
  def index
    products = Product.all.page(params[:page]).per(12)

    if params[:category]
      products = products.where(category: params[:category])
    end

    if params[:search]
      products = products.where('LOWER (product.name) LIKE LOWER(?)', "%#{params[:search]}%")
    end

    products = products.joins(:category_record).order('category.name')

    render json: products
  end
end
