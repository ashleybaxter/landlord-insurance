class Quote < ActiveRecord::Base
  attr_accessible :architecture_type, :building_excess, :building_sum, :content_excess, :content_sum, :employers_liability, :floor_construction, :postcode, :property_age, :property_type, :proposed_tenants, :roof_construction, :roof_type
  
  before_create :upcase_postcode
  
  validates :postcode, :presence => true, :length => { :minimum => 5 }
  validates :building_sum, { numericality: { greater_than: 0, less_than_or_equal_to: 500000, :unless => proc{|obj| obj.building_sum == 0} } }
  validates :content_sum, { numericality: { greater_than: 0, less_than_or_equal_to: 50000, :unless => proc{|obj| obj.content_sum == 0} }}
  
  validate :at_least_one_sum_insured

  def at_least_one_sum_insured
   # if !(building_sum.blank? ^ content_sum.blank?)
       #errors.add(:base, "Specify a charge or a payment, not both")
     #end
     errors.add(:base, 'A building and / or content sum must be selected. Both cannot be nil') if building_sum == 0 and content_sum == 0
  end
  
  
  def building_premium
    building_sum.to_i / 1000 * 1.10
  end
  
  def content_premium
    content_sum.to_i / 1000 * 1.00
  end
  
  def premium
    building_premium + content_premium
  end
  
  def premium_monthly
    a = premium * 5
    b = a / 100
    c = b + premium
    c / 10
  end
  
  def upcase_postcode
     self.postcode.upcase! if self.postcode
  end
  
end
