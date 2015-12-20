require_relative './seeds_helper'

reset_tables

fetch_spots_remote(false) #change to true to hit the spitcast API for spots

create_regions
create_counties
create_spots

# neighbors can only be fetched/set after spots are created

fetch_neighbors_remote(false) #change to true to hit the Spitcast API for neighbors
set_neighbors

create_guest_account

