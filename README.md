##Project Proposal: "Swell"

[Heroku Link][heroku]

[heroku]: http://surfswell.herokuapp.com

## Minimum Viable Product

Swell is a web application that lets surfers check wave forecasts. It is meant to combine the functionality of Spitcast and Surfline with the layout and style of AirBnB.

Swell provides surfing forecasts for 300 sites along the California coast.

**FEATURES**

A Main Page with:
- [ ] A Jumbotron-sized SpotFocus display of a user's home spot containing current forecast data and dynamic styling to reflect the conditions
- [ ] SpotPreview thumbnails of other spots including the user's favorites and nearby spots
- [ ] A search bar that can find spot forecasts by spot name, county, region, and description
- [ ] Highlighted links designed to encourage users to discover other spots

Spot Forecast Pages Have:
- [ ] curent conditions for a spot
- [ ] daily and weekly forecasts for the spot
- [ ] Interactive charts displaying weather, swell height, swell period, wave quality, wind, tide, air and water temperature, sunrise and sunset
- [ ] A map of nearby spots

Search: 
- [ ] A dynamic search bar that updates the results page as the user types
- [ ] search results cover spot name, county, region and description
- [ ] filterable by spot type, proximity, and region

Custom User Profiles:
- [ ] Users can set home spots and star their favorites
- [ ] Users can set display preferences


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

*Create Dispatcher and Stores
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

*Create React Elements in this order. See [elements][elements].
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
			*powered by Spitcast
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

*For LinkBox, SpotPreview and SpotFocus backgrounds
*Setup file system on server that organizes photos by spotid
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

