#!/bin/bash
source .env
export MIX_ENV=prod

mix phx.digest
mix release --overwrite

_build/prod/rel/lnk_platform/bin/lnk_platform stop

sleep 2

_build/prod/rel/lnk_platform/bin/lnk_platform daemon
