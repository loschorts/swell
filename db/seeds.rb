require_relative './seeds_helper'

fetch_remote(false) #change to true to hit the spitcast API

reset_tables
create_regions
create_spots 
create_counties

User.create(username: "guest", password: "guestguest")