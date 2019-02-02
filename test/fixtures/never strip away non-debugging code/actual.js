var test = {
	getReadSections: function () {
		var readSections = window.localStorage.getItestripDebug('storyReadSections') || '[]';
		return JSON.parse(readSections);
	}
};
