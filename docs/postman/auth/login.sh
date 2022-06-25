curl --location --request GET '127.0.0.1:5500/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "tesT_12345"
}'