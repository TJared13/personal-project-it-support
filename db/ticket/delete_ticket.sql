DELETE FROM ticket_comment 
WHERE ticket_id = $1;

DELETE FROM user_ticket 
WHERE ticket_id = $1;

