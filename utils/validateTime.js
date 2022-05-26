module.exports = (time) => {
	if (time.endsWith("AM") || time.endsWith("PM")) {
		const datePart = time.slice(0, -2)
		const hours = datePart.split(":")[0]
		const minutes = datePart.split(":")[1]

		if (!hours || !minutes) return false
		
		return parseInt(minutes) % 15 === 0
    } else {
        return false;
    }
};
