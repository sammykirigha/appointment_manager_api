let appointments = [];

const getAppoinmentById = (id) => {
    return appointments.find((appointment) => appointment.id === id);
};

const getAppointmentsByDocIdAndDate = (docId, date) => {
    const found = appointments.filter(
        (appointment) => appointment.docId === docId && appointment.date === date
    );
    return found;
};

const getAppointmentsForDocAtGivenTime = (docId, date, time) => {
    const found = appointments.filter(
		(appointment) => (
			appointment.docId === docId &&
			appointment.date === date && 
			appointment.time === time
		)
    );
    return found;
};

const deleteAppointmentByDocIdAndId = (docId, id) => {
    const filterdAppointments = appointments.filter(
        (appointment) => appointment.docId !== docId && appointment.id !== id
    );
    appointments = filterdAppointments;
};

const addAppointment = (data) => {
    appointments.push(data);

    return appointments
};

module.exports = {
    getAppoinmentById,
    getAppointmentsByDocIdAndDate,
    deleteAppointmentByDocIdAndId,
    addAppointment,
    getAppointmentsForDocAtGivenTime
};
