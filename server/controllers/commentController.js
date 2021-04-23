module.exports = {
    newComment: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {message} = req.body;
        
        console.log(user_id)
        if (user_id) {       
           const newComment = await db.comments.new_comment(user_id, message)
                res.status(200).send(newComment)
        } else {
            res.sendStatus(403)
        }
    },
    ticketComments: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(req.params)
        if (id) {
           const getComment =  await db.comments.get_ticket_comments(id)
                res.status(200).send(getComment)
        } else {
            res.sendStatus(403)
        }
    }
}