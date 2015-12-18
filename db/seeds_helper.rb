require 'byebug'

$REGIONS = {
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

def show_regions
	puts $REGIONS
end

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

	SpotPhoto.destroy_all
	ActiveRecord::Base.connection.reset_pk_sequence!('spot_photos')
end

def fetch_remote(should_run = false)
	return unless should_run

	#Fetch all spots from the API
	puts "fetching spot/county data from Spitcast"
	url = URI.parse('http://api.spitcast.com/api/spot/all')
	req = Net::HTTP::Get.new(url.to_s)
	res = Net::HTTP.start(url.host, url.port) {|http|
	  http.request(req)
	}
	spots = res.body
	File.write('allspots', spots)

	#Filter out spots that are not supported by the API
	spots = JSON.parse(File.read('allspots'))
	File.write('validspots','[')
	spots.each do |spot|
		if forecast_exists?(spot)
			open('validspots', 'a') do |f|
				f << JSON.stringify(spot) + ','
			end
			p File.read('validspots')
		else 
			p 'invalid!'
		end
	end
	open('validspots', 'a') do |f|
	f << spot.to_s + ']'
	end
end

def create_regions
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

def create_counties
	county_names = $REGIONS.keys
	county_names.each do |county_name|
		County.create!({
			name: county_name,
			spitcast_county: county_name.downcase.gsub(" ", "-"),
			region_id: get_region_id(county_name)
			})
	end
end

def create_spots
	spots = JSON.parse(File.read('validspots'))
	spots.each do |spot|
		Spot.create!({
			name: spot["spot_name"],
			spitcast_county: spot["county_name"].downcase.gsub(" ", "-"),
			county_id: County.find_by(name: spot["county_name"]).id,
			county_name: spot["county_name"],
			lat: spot["latitude"].to_f,
			lng: spot["longitude"].to_f,
			spitcast_id: spot["spot_id"].to_i,
			})
	end
end

def forecast_exists?(spot)
	puts "checking forecast for #{spot["spot_name"]}"
	url = URI.parse('http://api.spitcast.com/api/spot/forecast/' + spot["spot_id"].to_s + '/')
	req = Net::HTTP::Get.new(url.to_s)
	res = Net::HTTP.start(url.host, url.port) {|http|
	  http.request(req)
	}
	if res.message == "OK"
		return true
	else
		puts "invalid!"
		return false
	end
end

def get_region_id(county_name)
	return Region.find_by(name: $REGIONS[county_name]).id
end