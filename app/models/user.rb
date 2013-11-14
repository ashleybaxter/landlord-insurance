class User < ActiveRecord::Base
  attr_accessible :phone_number, :surname, :title
end
