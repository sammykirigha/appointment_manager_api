const doctors = [];

const getDoctors = () => {
    return doctors;
};

const getDoctorById = (id) => {
    return doctors.find(doc => doc.id === id);
};

const addDoctor = (data) => {
	doctors.push(data);
	return doctors;
};

module.exports = {
	getDoctors,
	getDoctorById,
	addDoctor
};
