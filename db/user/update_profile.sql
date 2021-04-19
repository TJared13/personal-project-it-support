UPDATE user_info SET username = $2, password = $3, first_name = $4, last_name = $5, birthday = $6, email = $7, phone_number = $8
WHERE user_id = $1;