root = ::File.dirname(__FILE__)
require 'bundler'
Bundler.require
require ::File.join(root, 'app')

# how to start sinatra
#  > bundle exec rackup -p 5678 -D
# how to stop sinatra
#  > ps aux | grep thin 
#  > kill -TERM "pid"
run Sinatra::Application
