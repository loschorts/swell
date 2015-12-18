require_relative './seeds_helper'

fetch_remote(false) #change to true to hit the spitcast API

reset_tables
create_regions
create_counties
create_spots

guest = User.create(username: "guest", password: "guestguest")
guest.add_favorite(120)
guest.add_favorite(83)
guest.add_favorite(1)
guest.add_favorite(697)