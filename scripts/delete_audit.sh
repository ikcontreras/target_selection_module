#!/bin/bash

API_ENDPOINT="http://localhost:8888"

if [ -z "$1" ]; then
    echo "Uso: $0 <audit_id>"
    exit 1
fi

AUDIT_ID="$1"

curl --silent --location \
    --request DELETE \
    "$API_ENDPOINT/audit/$AUDIT_ID" | jq .