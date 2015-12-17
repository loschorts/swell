require_relative './seeds_helper'

fetch_remote(false) #change to true to hit the spitcast API

reset_tables
create_regions
create_counties
create_spots 

User.create(username: "guest", password: "guestguest")
