module.exports = {
    newComment: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {message} = req.body;
        const date = new Date();
        console.log(user_id)
        if (user_id) {       
           const newComment = await db.comments.new_comment([user_id, date, message])
                res.status(200).send(newComment)
        } else {
            res.sendStatus(403)
        }
    },
    ticketComments: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        // const {message} = req.body
        if (user_id) {
           const newComment =  await db.comments.get_ticket_comments(user_id)
                res.status(200).send(newComment)
        } else {
            res.sendStatus(403)
        }
    }
}