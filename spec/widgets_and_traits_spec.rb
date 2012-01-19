require File.dirname(__FILE__) + '/spec_helper'

describe 'widgets and traits', :type => :request, :js => true do
  it "should fire widgetsReady" do
    visit('/test/base')
    
    page.should have_selector('h1.widgetsReady')
  end
  
  it "should fire widgetsReady on ajax" do
    visit('/test/base')
    page.should have_selector('h1.widgetsReady')
    
    page.evaluate_script('jQuery.get("/test/ajax")')
    page.should have_selector('h1.widgetsReady', :count => 2)
  end
  
  it "should hook up widgets" do
    visit('/test/base')
    
    page.should have_selector('.widget_loaded')
  end
  
  it "should hook up traits" do
    visit('/test/base')
    
    page.should have_selector('.trait_loaded')
  end
  
  it "should hook up widgets on ajax" do
    visit('/test/base')
    page.evaluate_script('jQuery.get("/test/ajax", function(d) { jQuery("#ajax").append(d); })')
    
    page.should have_selector('#ajax .widget_loaded')
  end
  
  it "should hook up traits on ajax" do
    visit('/test/base')
    page.evaluate_script('jQuery.get("/test/ajax", function(d) { jQuery("#ajax").append(d); })')
    
    page.should have_selector('#ajax .trait_loaded')
  end
end