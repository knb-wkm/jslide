require 'sinatra'
require 'sinatra/reloader'
require 'erb'
require 'org-ruby'

set :bind, '0.0.0.0'
Encoding.default_external = 'utf-8'

# git test
# def initialize
#   @slides_info = get_orgs("slides")
#  @docs_info = get_orgs("docs")
#end

def get_orgs(type)
  dir = File.dirname(__FILE__)
  files = Dir.glob("#{dir}/#{type}/*.org").sort
  file_info = files.map do |file|
    File.open(file) do |f|
      fname = file.split("/")[-1]
      org = Orgmode::Parser.new(f.read)
      title = org.lines.map do |slide|
        if slide.match(/\#\+title\:*/)
          slide.gsub(/\#\+title\: /, "")
        else
          fname
        end
      end
      {fname: fname, title: title.compact[0]}
    end
  end
end

get '/' do
  @slides_info = get_orgs("slides")
  # @docs_info   = get_orgs("docs")
  erb :index
end

get '/slides' do
  
end

get '/slides/:fname' do
  dir = File.dirname(__FILE__)
  File.open("#{dir}/slides/#{params[:fname]}") do |f|
    org = Orgmode::Parser.new(f.read)
    @slides = org.to_html.split("\n").map.with_index do |line, i|
      if i == 0
        line.gsub!(/^/, "<div class=\"slide\">")
      else
        line.gsub!(/<h2>/, "</div><div class=\"slide\"><h2>")
      end
      line.gsub!(/\<pre\sclass\=\"src\"/, "<pre class=\"prettyprint\"")
      line
    end
  end
  @slides = @slides.join("\n")
  erb :slide
end

get '/docs/:fname' do
  dir = File.dirname(__FILE__)
  File.open("#{dir}/docs/#{params[:fname]}") do |f|
    org = Orgmode::Parser.new(f.read)
    @docs = org.to_html.split("\n").map.with_index do |line, i|
      line.gsub!(/\<pre\sclass\=\"src\"/, "<pre class=\"prettyprint\"")
      line
    end
  end
  @docs = @docs.join("\n")
  erb :doc
end
