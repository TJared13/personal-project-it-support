require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {SERVER_PORT, SOCKET_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const authCtrl = require('./controllers/authController');
const ticketCtrl = require('./controllers/ticketController');
const commentCtrl = require('./controllers/commentController');
const adminCtrl = require('./controllers/adminController');
const auth = require('./middleware/authMiddleware');
const path = require('path');
const app = express();
//socket io
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const socket = require('socket.io')

app.use(express.json());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4
    }
}));

app.use(express.static(`${__dirname}/../build`));

//SOCKET IO
// const io = socket(
//     app.listen(SOCKET_PORT, () =>
//       console.log(`Socket listening on ${SOCKET_PORT}`)
//     )
//   );
io.on('connection', socket => {
  socket.on('comment', ({username, comment}) => {
      io.emit('comment', {username, comment})

  })
});






// USER LOGIN/REGISTRATION ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/session', authCtrl.getUser)
app.put('/user/profile', authCtrl.updateProfile)
app.get('/auth/logout', authCtrl.logout)


// TICKET ENDPOINTS
app.post('/user/ticket/new', ticketCtrl.newTicket)
app.get('/user/dash', ticketCtrl.getUserTickets)
app.get('/admin/dash', auth.adminsOnly, adminCtrl.getAllOpenTickets)
app.get('/user/ticket/:id', ticketCtrl.readTicket)
app.delete('/user/ticket/delete/:id', ticketCtrl.deleteTicket)

//COMMENT ENDPOINTS
app.post('/user/ticket/comments/new', commentCtrl.newComment)
app.get('/user/ticket/comments/:id', commentCtrl.ticketComments)




massive({
    connectionString:  CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))
    http.listen(SOCKET_PORT, console.log('listening on port 3132'))
})

// io.on('connection', async (socket) => {
//     socket.user = socket.request.session.user;
  
//     socket.join('chat');
  
//     try {
//       const messages = await commentCtrl.getTicketComments;
  
//       socket.emit('history', messages);
//     } catch (err) {
//       // Handle this error properly.
//       console.error(err);
//     }
//   });




// io.on("connection", socket => {
//     console.log("User Connected");
  
//     // EVERYONE IN THE ROOM
//     socket.on("join room", async data => {
//       const { room } = data;
//       const db = app.get("db");
//       console.log("Room joined", room);
//       let existingRoom = await db.comments.check_room({ id: room });
//       !existingRoom.length ? db.comments.create_room({ id: room }) : null;
//       let messages = await db.fetch_message_history({ id: room });
//       socket.join(room);
//       io.to(room).emit("room joined", messages);
//     });
//     socket.on("message sent", async data => {
//       const { room, message } = data;
//       const db = app.get("db");
//       await db.comments.create_message({ id: room, message });
//       let messages = await db.comments.fetch_message_history({ id: room });
//       io.to(data.room).emit("message dispatched", messages);
//     });
  
//     socket.on("disconnect", () => {
//       console.log("User Disconnected");
//     });
//   });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})