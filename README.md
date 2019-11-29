# Objects from around the world
![preview](https://github.com/kylebot0/frontend-data/blob/master/gh-images/Schermafbeelding%202019-11-28%20om%2011.48.40.png)
## Table of Contents 🗃

- [Live demo](#Live-demo)
- [Description](#Description)
- [Features](#Features)
  - [API request](#API-request)
  - [Timeline features](#Timeline-features)
  - [Upcoming features](#Upcoming-features)
  - [Known Bugs](#Known-Bugs)
- [Functionality](#Functionality)
- [Installation](#Installation)
  - [Before you clone](#Before-you-clone)
  - [Install the app](#Install-the-app)
  - [Usage](#Usage)
  
## Live demo

[You can find the demo here](https://kylebot0.github.io/frontend-data/)

## Concept

It shows all of the objects from the NMVW database in a bubble map. If the bubble is darker and larger it means that there are more objects in that country. Next to that you can also filter on what medium has been used and it properly resizes. If you want to see a rough estimate on how the much the bubbles contain there is also a legend in the bottom right corner.

## Description 📝

During this course I created a datavisualisation with D3, my concept is that i'm going to show the most used materials throughout the collection. I'm going to do that with a bubble map.

## Features 🛠️

### API request

The app starts with an API request to the NMVW collection API. It searches for a couple of things using a endpoint and a SparQL query. It collects a uri from an object, the amount it appears in the collection and the name of the word. It puts that data in a JSON style object array used throughout the application.


```json
{
        "cho": {
          "type": "uri",
          "value": "https://hdl.handle.net/20.500.11840/1033475"
        },
        "lat": {
          "type": "literal",
          "value": "-18.8"
        },
        "long": {
          "type": "literal",
          "value": "169.08333"
        },
        "placeName": {
          "type": "literal",
          "value": "Vanuatu"
        },
        "materialLabel": {
          "type": "literal",
          "value": "procedés en technieken"
        }
  }
```

For the real geeks, this is the SparQL query i used. For more information on the query and the data, take a quick look through my wiki.

```sparql
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
  PREFIX geo: <http://www.opengis.net/ont/geosparql#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX gn: <http://www.geonames.org/ontology#>
  PREFIX dct: <http://purl.org/dc/terms/>

  SELECT 	?lat ?long ?landLabel ?materialLabel WHERE {
          ?cho dct:spatial ?place .
          ?place skos:exactMatch/wgs84:lat ?lat .
          ?place skos:exactMatch/wgs84:long ?long .
          ?place skos:exactMatch/gn:parentCountry ?land .
          ?land gn:name ?landLabel .
        ?cho dct:medium ?medium .
       ?medium skos:broader ?medium2 .
			?medium2 skos:broader ?medium3 .
  		?medium3 skos:broader ?medium4 .
  		?medium4 skos:broader ?mediumBroad .
  		?mediumBroad skos:prefLabel ?materialLabel .

    } LIMIT 10000 OFFSET ${offset}
  `
```

### Bubble map features

- [x] Dynamically renders data
- [x] request via an api
- [x] Ability to size correctly
- [x] Plot latitude and longitude on a map
- [x] Use an SVG
- [x] Choose the medium
- [x] Update the SVG


### Known Bugs

- The only bug that is currently known is that the legend stacks in itself when there are only 2 known objects.

### Upcoming features

- [ ] Linked charts


## Installation 🔍

### Before you clone

- [x] Install a Code Editor
- [x] Start up your CLI

### Install the app
```
git clone https://github.com/kylebot0/frontend-data.git
```
Get into the right folder
```
cd frontend-data/src
```
Then just start the application

### Gitignore
My .gitignore contains all of the files and maps you dont want in your application, use this if you're going to commit and push to your own repo.
```
# dependencies
/node_modules
/config
/scripts

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Usage

Start the application
```
Open it up in your finder / explorer
```

Then it should fire up a localhost in your browser, if that's not the case use this in your address bar.
```
localhost:3000
```

## Credits

I followed a tutorial for the legend from: https://www.d3-graph-gallery.com/graph/bubble_legend.html. It shows a complete example on how to make it. The functional getData pattern i got from Laurens. It is tweaked heavily so i kinda gave my own twist to it.


## License
Find the license [here](https://github.com/kylebot0/frontend-data/blob/master/LICENSE)


