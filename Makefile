.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup: backend_deps frontend_deps 

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server: start_server start_frontend

stop: stop_server stop_frontend 

# `make test` will be used after `make setup` in order to run
# your test suite.
test: test_backend test_frontend

deploy: deploy_backend deploy_frontend

backend_deps:
	cd lnk_platform && mix do deps.get, deps.compile, ecto.create, ecto.migrate && cd ../

frontend_deps:
	cd lnk-app/ && yarn && cd ../

start_server:
	cd lnk_platform && mix phx.server & cd ../

start_frontend:
	cd lnk-app && yarn dev & cd ../

stop_server:
	lsof -t -i:4000 | xargs kill

stop_frontend:
	lsof -t -i:8080 | xargs kill

test_backend:
	cd lnk_platform && mix test && cd ../

test_frontend:
	cd lnk-app && yarn test && cd ../

deploy_backend:
	cd lnk_platform && ./deploy.sh && cd ../

deploy_frontend:
	cd lnk-app && ./deploy.sh && cd ../
