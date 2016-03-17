module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			development: {
				options: {
					paths: ["./ui/less"],
					yuicompress: true
				},
				files: {
					"./ui/css/style.css": "./ui/less/main.less"
				}
			}
		},
		watch: {
			files: "./ui/less/*",
			tasks: ["less"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch', 'less']);
};