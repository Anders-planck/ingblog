#!/bin/bash



# Load environment variables from .env file in docker directory
# shellcheck disable=SC2046
# shellcheck disable=SC2196
export $(egrep -v '^#' docker/.env | xargs)

# Check if the necessary environment variables are set
if [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "VERCEL_ORG_ID and VERCEL_PROJECT_ID must be set in the .env file"
    exit 1
fi

echo "VERCEL_ORG_ID and VERCEL_PROJECT_ID are set like $VERCEL_ORG_ID and $VERCEL_PROJECT_ID"

# Create the .vercel directory if it doesn't exist
if [ ! -d ".vercel" ]; then
    mkdir .vercel
    echo "Created .vercel directory"
fi

# Write the orgId and projectId to the project.json file
echo "{\"orgId\":\"$VERCEL_ORG_ID\",\"projectId\":\"$VERCEL_PROJECT_ID\"}" > .vercel/project.json
