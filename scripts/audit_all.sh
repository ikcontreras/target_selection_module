#!/bin/bash

API_ENDPOINT="http://localhost:8888"


cd $(dirname $0)
curl --silent --location "$API_ENDPOINT/audit" | jq .
