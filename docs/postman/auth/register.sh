curl --location --request POST '127.0.0.1:5500/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fullNames": "Test User",
    "email": "test@gmail.com",
    "mobile": "0780000000",
    "password": "tesT_12345",
    "confirmPassword": "tesT_12345"
}'