const router = require("express").Router();
const shortid = require("shortid");
const Joi = require("joi");

const {
    getAppointmentsByDocIdAndDate,
    getAppoinmentById,
    deleteAppointmentByDocIdAndId,
    addAppointment,
    getAppointmentsForDocAtGivenTime,
} = require("../state/appointments");
const { getDoctorById } = require("../state/doctors");
const validateTime = require("../utils/validateTime");

// Routes

router.get("/:docId/:date", (req, res) => {
    const { docId, date } = req.params;

    if (!getDoctorById(docId)) {
        return res.status(404).send({ message: "Doctor Not Found" });
    }

    const appointments = getAppointmentsByDocIdAndDate(docId, date);

    if (appointments.length > 0) return res.send({ appointments });
    else return res.status(404).send({ message: "Appointments Not Found" });
});

router.delete("/:docId/:id", (req, res) => {
    const { docId, id } = req.params;

    if (!getDoctorById(docId)) {
        return res.status(404).send({ message: "Doctor Not Found" });
    }

    if (!getAppoinmentById(id)) {
        return res.status(404).send({ message: "Appointment Not Found" });
    }

    try {
        deleteAppointmentByDocIdAndId(docId, id);
    } catch (error) {
        res.status(404).send({ message: "Failed to delete Appointment" });
    }
});

router.post("/:docId", (req, res) => {
    const { docId } = req.params;

    if (!getDoctorById(docId)) {
        return res.status(404).send({ message: "Doctor Not Found" });
    }

    try {
        const schema = Joi.object({
            pfirstname: Joi.string().required(),
            plastname: Joi.string().required(),
            date: Joi.date().required(),
            time: Joi.string().required(),
            kind: Joi.string().required().valid('new-patient', 'follow-up'),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({error: error.details[0].message});
		}
		
		if(!validateTime(req.body.time))
			return res.status(400).send({ message: `Invalid time..` });
		
        if (getAppointmentsForDocAtGivenTime(docId, req.body.date, req.body.time).length >= 3) {
            return res.status(400).send({ message: `No more that 3 appointments at same time` });
        }

        const id = shortid.generate();
		const appointment = addAppointment({ docId, id, ...req.body });
		res.status(201).send({appointment})
	} catch (error) {
		console.log(error);
        res.status(404).send({ message: "Failed to add Appointment" });
    }
});

module.exports = router;
