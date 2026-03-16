# Pokemon Sacred Gold Team Builder
This web application is a team builder for the Pokemon ROMhack ["Pokemon Sacred Gold".](https://gbatemp.net/threads/pokemon-sacred-gold-storm-silver.327567/)

It allows users to search and filter from all Pokemon obtainable in Pokemon Sacred Gold. You can add them to a six slot team and analyze your team's overall type coverage. Pokemon sprites and type information are retrieved dynamically from https://pokeapi.co

## Everything you need to know before you start

The "Suggest Pokemon" button is currently a work in progress.

### Running the project locally

Clone the repository -> open project folder -> open index.html in your browser

I am looking to host it somewhere in the future.

## Features
- Build a team of up to six Pokemon, picked from only those available in Pokemon Sacred Gold.
- Add and remove Pokemon from team slots
- Search Pokemon by name
- Filter Pokemon by type
- Display Pokemon sprites and types
- Dynamically updated team view
- Automatic type coverage analysis
- Separate offensive and defensive type weakness detection.
- Suggest a Pokemon for the team (Work in progress!)

## Tech Stack

- JavaScript (ES6+)
- CSS & HTML
- REST API

External data:
- PokeAPI (https://pokeapi.co)

## Why I made this

I created this project to practice building an interactive frontend application that retrieves and processes data from an external API. I specifically chose to make this project because I have been wanting to play Pokemon Sacred Gold but could not decide on what team I would want to use. Since Sacred Gold is notoriously difficult, I decided I would code a project that would help me pick a strong team.

While working on this project I gained experience with:

- Fetching and handling data from APIs
- Using asynchronous JavaScript
- Dynamically generating and updating HTML elements
- Managing application state in the browser
- Implementing interactive UI logic with JavaScript

Figuring out the logic for the type weakness advice and the "Suggest Pokemon" button was the hardest part of this project. However figuring out how to make it work was a very satisfying process. In the future I would like to break this project down into modules, to make it easier to work with and expand in the future.

