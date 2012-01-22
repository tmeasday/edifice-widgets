# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "edifice-widgets/version"

Gem::Specification.new do |s|
  s.name        = "edifice-widgets"
  s.version     = Edifice::Widgets::VERSION
  s.authors     = ["Tom Coleman"]
  s.email       = ["tom@thesnail.org"]
  s.homepage    = "http://edifice-rails.com"
  s.summary     = %q{Edifice-widgets is a companion gem to edifice which allows simple unobtrusive javascript behaviours.}
  s.description = %q{Edifice-widgets is a companion gem to edifice which allows simple unobtrusive javascript behaviours, allowing you to make pages dynamic, whilst avoiding unnecessary boilerplate.}
  
  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  
  s.add_dependency 'jquery-rails'
  
  s.add_development_dependency 'rake'
  s.add_development_dependency 'rails'
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'capybara'
  s.add_development_dependency 'tzinfo'
end
