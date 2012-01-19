Rails31::Application.routes.draw do
  match "test/base" => 'test#base'
  match "test/ajax" => 'test#ajax'
end
