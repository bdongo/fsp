#!/usr/bin/env bash

# exit on error
set -o errexit

npm run build
bundle exec rake assets:clean
bundle install
rails db:migrate
rails db:seed