module.exports = {
    options: {
        standalone: true,
        jar_path: '<%= config.seleniumJarLocation %>',
        jar_url: 'http://selenium-release.storage.googleapis.com/2.44/selenium-server-standalone-2.44.0.jar',
        src_folders: 'test/testsuites',
        output_folder: 'reports/nightwatch',
        selenium_host: '<%= config.seleniumHost %>',
        selenium_port: '<%= config.seleniumPort %>',
        selenium: {
            host: '<%= config.seleniumHost %>',
            port: '<%= config.seleniumPort %>',
            start_process: true
        }
    }
};
