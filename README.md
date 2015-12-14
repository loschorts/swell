Project Proposal: "Swell"

[Heroku Link][heroku]

[heroku]: http://surfswell.herokuapp.com

## Minimum Viable Product

Swell is a web application meant to combine the functionality of Surfline and Magic Seaweed with the layout and style of AirBnB.

Swell provides spot-specific forecasts for over 200 sites along the California coast.

**FEATURES**

Forecasts feature:  
- [ ] Current Conditions for a Spot
- [ ] Weekly Forecasts for a Spot
- [ ] Interactive charts displaying Swell Height, Swell Period, Wave Quality, Wind, Tide, Air and Water Temperature, Sunrise and Sunset

Searchable Spots Feed: 
- [ ] Main page features a scrollable list of spots ordered by proximity (changeable by user preference)
- [ ] Users' favorite spots are pushed to the top of the feed
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

### Phase 1: User Authentication, Spot/County/Region/User Models, JSON API, LandingPage

* Implement database schema.
* User signup/auth(models and controllers w/ basic html views).
* Data models and associations (models and controllers w/ json views).
* Implement a basic html landing page

[Details][phase-one]

### Phase 2: Flux Architecture (2.5 days)

	* Create Dispatcher and Stores
		*SpotStore
		*CountyStore
	*API Actions:
			*getSpotForecast(options)
			*getCountyForecast(options)
			*getWeatherForecast(coords)
		*Helper Actions
			*SpitcastQuery(options, callback)
			*OpenweatherQuery(options, callback)

* Create React Elements in this order. See [elements][elements].
	*HomePage
		*LinkBox: simply a box that with text that links
		*FeatureBox: container for LinkBoxes and SpotPreviews
		*Spot Preview: a LinkBox with limited forecast info
			*Swell Height and quality
			*Styled based on quality and possibly weather
		*HighlightsBox: editorialized FeatureBox
			*Best Choice Today: SpotPreview of best forecast
			*LinkBox "Search by Region" to RegionsPage
		*SpotFocus: a Jumbotron-sized Spot Preview with more info
			*Styled based on weather
			*Detail: Shows Tide, Wind, Swell Details
				*Dynamically Styled based on conditions
			*MiniDetail: Detail with less info and less styling
		*NavBar
			*SearchBar
				*Searches Spot, County, Region names and descriptions
			*AccountMenu
			*HomeLink
		*Footer
	*ForecastPage
		*Chart: receives data and time props to render:
			*swell height, wind, or tide
			*daily or weekly
		*Map: pins nearby spots and links to their forecast pages
	*SearchPage


* Implement Router.
* Implement Maps Element.
* Setup API Actions Util to fetch 3rd party API data

[Details][phase-two]

### Phase 3: Notebooks and Tags (2 days)



[Details][phase-three]

### Phase 4: Allow Complex Styling in Notes (1 day)

[Details][phase-four]

### Phase 5: Reminders and Garbage Collection (1 day)


[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

	*Background Slideshow on LandingPage using spot pics

### Bonus Features (TBD)
	*Implement Regional Forecasts by crunching child-county forecasts
		*cache the data to avoid abusing the API
	*Searchbar can search by wave-size and other forecast elements

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
