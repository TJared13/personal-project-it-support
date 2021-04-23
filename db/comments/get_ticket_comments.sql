SELECT c.comment_id, c.message FROM ticket_comment c
JOIN user_info u ON u.user_id = c.user_id
JOIN user_ticket t ON t.ticket_id = c.ticket_id
WHERE c.ticket_id = $1;

