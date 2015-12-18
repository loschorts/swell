require_relative './seeds_helper'

fetch_remote(false) #change to true to hit the spitcast API

reset_tables
create_regions
create_counties
create_spots

guest = User.create(username: "guest", password: "guestguest")
guest.add_favorite(11)
guest.add_favorite(30)
guest.add_favorite(47)
guest.add_favorite(15)