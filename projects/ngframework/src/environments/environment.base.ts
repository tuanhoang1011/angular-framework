export default {
    host: '',
    prefix: '',
    production: true,
    version: '2023.0504.1',
    aws_appsync: {
        API: {
            aws_appsync_graphqlEndpoint: '',
            aws_appsync_region: '',
            aws_appsync_authenticationType: 'AWS_LAMBDA'
        }
    },
    logger: {
        db: 'logger-store',
        objectStore: 'log',
        levels: ['Error', 'Operation', 'Info'],
        maxBundleSize: 500,
        dateFormat: 'yyyyMMdd hh:mm:ss',
        defaultUsername: 'GUEST'
    }
};
