DELETE FROM ticket_comment 
WHERE ticket_id = $1;

DELETE FROM user_ticket 
WHERE ticket_id = $1;

-- SELECT * FROM user_ticket
-- WHERE user_id = $1;

-- SELECT t.ticket_id, t.title FROM user_ticket t
-- JOIN user_info u ON u.user_id = t.user_id
-- WHERE u.user_id = $1
-- returning *;