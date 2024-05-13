#!/bin/bash



# Load environment variables from .env file in docker directory
# shellcheck disable=SC2046
# shellcheck disable=SC2196
export $(egrep -v '^#' docker/.env | xargs)

# Check if the necessary environment variables are set
if [ -z "$VITE_SUPABASE_ANON_KEY" ] || [ -z "$VITE_SUPABASE_URL" ]; then
    echo "VITE_SUPABASE_ANON_KEY and VITE_SUPABASE_URL must be set in the .env file"
    exit 1
fi

echo "VITE_SUPABASE_ANON_KEY and VITE_SUPABASE_URL are set like $VITE_SUPABASE_ANON_KEY and $VITE_SUPABASE_URL"

# create the .env file if not exists and append the environment variables or set them if they already exist
if [ ! -f ".env" ]; then
    echo "VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY" > .env
    echo "VITE_SUPABASE_URL=$VITE_SUPABASE_URL" >> .env
    echo "Created .env file"
else
    sed -i "s/VITE_SUPABASE_ANON_KEY=.*/VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY/" .env
    sed -i "s/VITE_SUPABASE_URL=.*/VITE_SUPABASE_URL=$VITE_SUPABASE_URL/" .env
    echo "Updated .env file"
fi
