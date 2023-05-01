#!/usr/bin/env bash

# exit on error
set -o errexit

npm run build
bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
rails db:migrate
rails db:seed