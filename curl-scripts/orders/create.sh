#!/bin/bash

API="http://localhost:4741"
URL_PATH="/orders"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \


echo
