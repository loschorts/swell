Project Proposal: "Swell"

[Heroku Link][heroku]

[heroku]: http://surfswell.herokuapp.com

## Minimum Viable Product

Swell is a web application meant to combine the functionality of Surfline and Magic Seaweed with the layout and style of AirBnB.

Swell provides surfing forecasts for 300 sites along the California coast.

**FEATURES**

Forecasts feature:  
- [ ] Current Conditions for a Spot
- [ ] Weekly Forecasts for a Spot
- [ ] Interactive charts displaying Swell Height, Swell Period, Wave Quality, Wind, Tide, Air and Water Temperature, Sunrise and Sunset

Searchable Spots Feed: 
- [ ] Main page features a scrollable list of spots ordered by proximity (changeable by user preference)
- [ ] Users' favorite spots are at the top of the feed
- [ ] Spots can optionally be shown on a Google map
- [ ] Filterable by type, region, and (bonus) quality for the current conditions

Users can create custom profiles:
- [ ] Favorite spots to be displayed on Login
- [ ] Forecast display preferences: break type

## External API Dependencies
- Spitcast API (http://spitcast.com/api/docs)
- Openweather API (http://openweathermap.org/api)
- Google Maps API (https://developers.google.com/maps/)

## Design Docs
* [View Wireframes][view]
* [Component Hierarchy][elements]
* [Schema][schema]

[view]: ./docs/wireframes/views.png
[elements]: ./docs/wireframes/elements.txt
[db-schema]: ./docs/wireframes/db-schema.txt

## Implementation Timeline

### Phase 1: User Authentication, Spot/County/Region/User Models, JSON API, LandingPage (2 days)

* Implement database schema.
* User signup/auth(models and controllers w/ basic html views).
* Data models and associations (models and controllers w/ json views).
* Implement a basic html landing page

### Phase 2: Flux Architecture (4 days)

	* Create Dispatcher and Stores
		*SpotStore
		*CountyStore
	*API Actions:
			*getSpotForecast(options)
			*getCountyForecast(options)
			*getWeatherForecast(coords)
			*(options hash to specify location, daily vs. weekly)
		*Helper Actions
			*SpitcastQuery(options)
			*OpenweatherQuery(options)

* Create React Elements in this order. See [elements][elements].
	*HomePage
		*LinkBox: simply a box with text that links
		*FeatureBox: container for LinkBoxes and SpotPreviews
		*Spot Preview: a LinkBox with limited forecast info
			*Swell Height and quality
			*Styled based on quality and possibly weather
			*Star to add to Favorites
		*HighlightsBox: editorialized FeatureBox
			*Best Choice Today: SpotPreview of best forecast
			*LinkBox "Search by Region" to RegionsPage
		*SpotFocus: a Jumbotron version of Spot Preview
			*Styled based on weather
			*Detail: Shows Tide, Wind, Swell Details
				*Icons
				*List relevant data in each
			*MiniDetail: Detail with less info, less styling
			*Star to Add to favorites
		*NavBar
			*SearchBar
				*Searches a precached hash of Spot, County, Region names and descriptions onChange
			*AccountMenu
			*HomeLink
		*Footer
	*ForecastPage
		*Chart: receives data and time props to render:
			*swell height, wind, or tide
			*daily or weekly
		*Map: pins nearby spots and links to their forecast pages
	*SearchPage
		*SearchBar with options
		*options: 
			*Distance Filter (text)
			*Dropdown (breaktype)
			*County/Region Filter (dropdown)
		*Map:
			*centered on search result average
			*updates onChange of SearchBar/Options

*Implement the Router
	*Render HomePage, ForecastPage, RegionsPage, and SearchPage as discreet Pages, but navigation inside each as React

[Details][phase-two]

### Phase 3: Photos (1 day)

*for LinkBox, SpotPreview and SpotFocus backgrounds
*Setup File System that organizes photos by spotid
*Create associations (or something?) for Counties/Regions to have photos 

### Phase 3: STYLE HTML AND CSS (2 days)

*Bootstrap!
*Gussy up Auth Pages
*User Preferences Page
	*edit favorites (top favorite is 'home spot')
	*delete account
	*toggle units

*HomePage
	*A 'home spot' SpotFocus
	*A Favorites FeatureBox
	*A Nearby Featurebox

*Dynamic Transitions to Charts and Icons
	*Ripple Effect for Bar Chart
	*Dynamic Icon for Weather
	*Compass for Wind

*Dynamic Weather-Based Styling to SpotFocus 
	*Change class based on weather
	*class styling reflects weather in colors
	*background pic shaded/desaturated if gloomy/raining
	*bonus add raindrops if raining

*Add Styling that responds to certain types of forecasts

*Background Slideshow on LandingPage using spot pics

### Phase 4: Seed (1 day)
	*Seed Photos, Spot Descriptions

### Bonus Features (TBD)
	*Implement Regional Forecasts by crunching child-county forecasts
		*cache the data to avoid abusing the API
	*Searchbar can search by wave-size and other forecast elements
	*Users can set search and filter preferences

