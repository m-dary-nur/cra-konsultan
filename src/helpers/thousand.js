const thousand = (x, precision = null) => {
	if (precision) {
		x = parseFloat(x).toFixed(precision)
	}
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
}

export default thousand