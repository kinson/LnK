# Lnk
![Github Actions](https://github.com/kinson/LnK/actions/workflows/ci.yml/badge.svg)
>Yet another URL shortener.

## Getting Started

Before getting started, the following software needs to be installed:
* [Docker](https://docs.docker.com/get-docker/)
* [Node.js](https://nodejs.org/en/download/) (this application was developed using v16)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* [Elixir](https://elixir-lang.org/install.html)
* [Phoenix](https://hexdocs.pm/phoenix/installation.html)

### Setup
From the project root, run `make setup` to:
1) Download and start the database Docker image for Postgres
2) Fetch & compile elixir dependencies
3) Create & migrate the database
4) Stop the Docker container

### Start the Server
From the project root, run `make server` to:
1) Start the Docker container
2) Start the backend server
3) Start the frontend web application
4) Go to http://localhost:8080 to use the web application

### Stop the Server
From the project root, run `make stop` to:
1) Stop the backend server
2) Stop the frontend server
3) Stop the Docker container

## Notes on Approach

### Dark Mode Toggle

Full disclosure, I took these icons from a project I contributed them to previously, you can find that code [here](https://github.com/elixirschool/school_house/blob/master/lib/school_house_web/templates/layout/_dark_mode_toggle.html.leex).

### Using Next.js

I opted to use Next.js on the frontend because I have found it makes the spin up process for a new react app even quicker (at least for me) than `create-react-app`.

### Using TypeScript

I have not used TypeScript on the frontend before (aside from React Native), but I opted to for this project because it _feels_ like a safer choice than JavaScript in general and it provided piece of mind while rapidly developing this website.

### Next Steps
I did not want to overengineer this project at the risk of making it too time consuming to reason about, but some things I would add in the future are:
* A caching mechanism on the backend (possibly using [this library](https://github.com/kinson/fiat)) to avoid a round trip to the database when querying a url
* Continuous deployment to a free-tier service from a web hosting service
* Better API response validation and typing using TypeScript
* A feature to let people choose custom shortened URLs

_If you have made it this far, thanks for reading :)_