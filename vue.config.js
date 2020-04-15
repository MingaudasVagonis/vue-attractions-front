module.exports = {
	runtimeCompiler: true,
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/_variables.scss";`,
			},
		},
	},
};
