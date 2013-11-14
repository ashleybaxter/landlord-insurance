class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      redirect_to @user
    end
  end
  
  def show
    @user = User.find(params[:id])
    render :layout => false
  end
  
end