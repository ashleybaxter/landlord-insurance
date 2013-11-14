class QuotesController < ApplicationController
  
  def new
    @quote = Quote.new
  end
  
  def create
    @quote = Quote.new(params[:quote])
    respond_to do |format|
      if @quote.save
        format.js
      else
        format.html { render action: "new" }
        format.js { render :action => "error"}
      end
    end
  end
  
  def show
    @quote = Quote.find(params[:id])
  end
  
end
