module.exports = {
    newTicket: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {title, category, description, media} = req.body;
        const date = new Date();
        console.log(user_id)
        if (user_id) {       
           const createNew = await db.ticket.create_ticket([user_id, date, title, category, description, media])
                res.status(200).send(createNew)
        } else {
            res.sendStatus(403)
        }
    },
    getUserTickets: async (req, res) => {
        const db = await req.app.get('db');
        let {user_id} = req.session.user;
        if (user_id) {
             db.ticket.get_user_tickets(user_id)
                .then(dbRes => res.status(200).send(dbRes))
        } else {
            res.sendStatus(403)
        }
    },
    readTicket: async (req, res) => {
        await req.app.get('db').ticket.read_ticket(req.params.id)
        .then(ticket => ticket[0] ? res.status(200).send(ticket[0]) : res.status(200).send({}))
        .catch(err => console.log(err))
    },

    deleteTicket: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        console.log('work', id)
        
        const updatedTicketList = await db.ticket.delete_ticket(id)
        res.status(200).send(updatedTicketList)
    }
}