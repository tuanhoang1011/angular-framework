export default {
    apiHost: 'host',
    apiPrefix: 'prefix',
    wsUrl: 'ws://localhost:8181',
    production: true,
    debugMode: false,
    env: '',
    version: '',
    aws_appsync: {
        API: {
            aws_appsync_graphqlEndpoint: '',
            aws_appsync_region: 'ap-northeast-1',
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
