export default {
    host: '',
    prefix: '',
    production: true,
    aws_appsync: {
        API: {
            aws_appsync_graphqlEndpoint: '',
            aws_appsync_region: '',
            aws_appsync_authenticationType: 'AWS_LAMBDA'
        }
    },
    storage: {
        localStorage: {
            key: 'ngframework-cache'
        },
        indexedDB: {
            db: 'ngframework-indexed-db',
            log: {
                objectStore: 'log',
                levels: ['All', 'Error', 'Operation', 'Info', 'Warn', 'Debug', 'Off'],
                dateFormat: 'yyyyMMdd hh:mm:ss',
                defaultUsername: 'GUEST'
            }
        }
    }
};
