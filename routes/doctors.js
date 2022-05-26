const router = require("express").Router();
const Joi = require("joi");
const shortid = require("shortid");
const { getDoctors, getDoctorById, addDoctor } = require("../state/doctors");

// Routes

router.get("/", (req, res) => {
    res.send(getDoctors());
});

router.post("/", (req, res) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
	});
	
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({error: error.details[0].message});
	}
	
	try {

		const id = shortid.generate();
		const doctor = addDoctor({ id, ...req.body });
		res.status(201).send({doctor})
		
	} catch (error) { 
		res.status(404).send({ message: "Failed to add doctor" });
	}
       
});

module.exports = router;
