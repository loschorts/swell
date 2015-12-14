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
- Spitcast API (spitcast.com/api/docs)
- Openweather API (http://openweathermap.org/api)
- Google Maps API (https://developers.google.com/maps/)

## Design Docs
* [View Wireframes][view]
* [Component Hierarchy][elements]
* [Database Schema][db-schema]
* [API Schema][api-schema]

[view]: ./docs/wireframes/views.png
[elements]: ./docs/wireframes/elements.md
[db-schema]: ./docs/wirefreames/db-schema.md
[api-schema]: ./docs/wireframes/api-schema.md

## Implementation Timeline

### Phase 1: User Authentication, Note Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Notes.

[Details][phase-one]

### Phase 2: Flux Architecture and Note CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Note store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Notes `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Notes can be created, read, edited and destroyed in the browser. Notes should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start using basic bootstrap for
styling.

[Details][phase-two]

### Phase 3: Notebooks and Tags (2 days)

Phase 3 adds organization to the Notes. Notes belong to a Notebook, which has
its own `Index` view. Create JSON API for Notebooks. Notes can also now be
tagged with multiple tags. Users can bring up notes in a separate `SearchIndex`
view by searching for their tags. Once the tag search is implemented, I will
extend this to a fuzzy search through every Note's content.

[Details][phase-three]

### Phase 4: Allow Complex Styling in Notes (1 day)

Using the react-quill library (based on Quill.js), allow for complex styling of
notes.

[Details][phase-four]

### Phase 5: Reminders and Garbage Collection (1 day)

Phase 5 introduces two new features. First, users can set reminders on notes
which will at the time they are set for prompt the user to review and edit the
given note. In addition, I will implement a feature that asks users to review
notes once they reach a certain age and ask whether they should be kept,
archived, or deleted.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now, but in
Phase 6 I will add styling flourishes and make modals out of some elements (like
the NotebookForm).

### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Use javascript library for cleaner tag selection
- [ ] Changelogs for Notes
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
