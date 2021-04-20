UPDATE user_info SET first_name = $1, last_name = $2, birthday = $3, email = $4, phone_number = $5, username = $6
WHERE user_id = $7
RETURNING *;