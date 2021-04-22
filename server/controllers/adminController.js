module.exports = {
    getAllOpenTickets: async (req, res) => {
        const db = await req.app.get('db');
        let {user_id} = req.session.user;
        if (user_id) {
             db.admin.get_all_open()
                .then(dbRes => res.status(200).send(dbRes))
        } else {
            res.sendStatus(403)
        }
    },
}