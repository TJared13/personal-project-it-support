const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password, first_name, last_name, birthday, email, phone_number, is_admin} = req.body;
        const phoneNumber = parseInt(phone_number);

        console.log(typeof phoneNumber)
        try {
            const [existingUser] = await db.user.find_user_by_username(username);
            
            if (existingUser) {
                return res.status(409).send('Username already exists')
            }
            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const[newUser] = await db.user.register_user(username, hash, first_name, last_name, birthday, email, phoneNumber, is_admin)
            
            req.session.user = newUser;
            
            res.status(200).send(newUser)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password, isAdmin} = req.body;

        const [existingUser] = await db.user.get_user([username, isAdmin])
        
        if (!existingUser){
            return res.status(401).send('User does not exist')
        }
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        if (!isAuthenticated){
            return res.status(401).send('Incorrect password')
        }
        req.session.user =  existingUser
        delete req.session.user.password
        res.status(200).send(req.session.user)
    },

    updateProfile: async (req, res) => {
        const db = req.app.get('db');
        const {first_name, last_name, birthday, email, phone_number, username} = req.body;
        const phoneNumber = parseInt(phone_number);

        const[updateProfile] = await db.user.update_profile(first_name, last_name, birthday, email, phoneNumber, username)
        
        req.session.user = updateProfile;
        
        res.status(200).send(req.session.user)
        console.log(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: async (req, res) => {
        if (req.session.user) {
           return res.status(200).send(req.session.user)
        }
        res.status(400).send('ERROR 404: No session found')
    },
};