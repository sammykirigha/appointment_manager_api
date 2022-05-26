const express = require('express');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/appointments', require('./routes/appointments'));

app.get("/", (req, res) => {
	res.send("App running...")
})


// Server Setup
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});