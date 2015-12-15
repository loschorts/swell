def reset_tables
	Spot.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('spots')

	County.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('counties')
		
	Region.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('regions')

	User.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('users')

	Favorite.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('favorites')

	Preference.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('preferences')

	SpotPhoto.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('spot_photos')
end

def fetch_remote(should_run = false)
	return unless should_run
	puts "fetching spot/county data from Spitcast"
	url = URI.parse('http://api.spitcast.com/api/spot/all')
	req = Net::HTTP::Get.new(url.to_s)
	res = Net::HTTP.start(url.host, url.port) {|http|
	  http.request(req)
	}
	spots = res.body
	File.write('allspots', spots)
end

def create_spots
	spots = JSON.parse(File.read('allspots'))
	spots.each do |spot|
		Spot.create!({
			name: spot["spot_name"],
			county_name: spot["county_name"],
			spitcast_county: spot["county_name"].downcase.gsub(" ", "-"),
			lat: spot["latitude"].to_f,
			lng: spot["longitude"].to_f,
			spitcast_id: spot["spot_id"].to_i,
			})
	end
end

def create_counties
	County.destroy_all
	counties = Spot.all.select(:county_name).uniq
	counties.each do |county|
		county_name = county[:county_name]
		County.create({
			name: county_name,
			spitcast_county: county_name.downcase.gsub(" ", "-"),
			region_id: get_region_id(county_name)
			})
	end
end

def create_regions
	Region.destroy_all
	Region.create({
		name: "The North",
		description: "Del Norte, Humbolt, and Mendino Counties"
		})
	Region.create({
		name: "The Bay Area",
		description: "Sonoma, Marin, San Mateo, and San Francisco Counties"
		})
	Region.create({
		name: "Santa Cruz and Monterey",
		description: "Santa Cruz and Monterey Counties"
		})
	Region.create({
		name: "Santa Barbara, SLO, and Ventura",
		description: "San Luis Obispo, Santa Barbara, and Ventura Counties"
		})
	Region.create({
		name: "So Cal",
		description: "LA, OC, and San Diego Counties"
		})
end

def get_region_id(county_name)
	regions = {
		"Del Norte" => "The North",
		"Humboldt" => "The North",
		"Mendocino" => "The North",
		"Sonoma" =>  "The Bay Area",
		"Marin" => "The Bay Area",
		"San Mateo" => "The Bay Area",
		"San Francisco" => "The Bay Area",
		"Santa Cruz" => "Santa Cruz and Monterey",
		"Monterey" => "Santa Cruz and Monterey",
		"San Luis Obispo" => "Santa Barbara, SLO, and Ventura",
		"Santa Barbara" => "Santa Barbara, SLO, and Ventura",
		"Ventura" => "Santa Barbara, SLO, and Ventura",
		"Los Angeles" => "So Cal",
		"Orange County" => "So Cal",
		"San Diego" => "So Cal"
	}
	return Region.find_by(name: regions[county_name]).id
end