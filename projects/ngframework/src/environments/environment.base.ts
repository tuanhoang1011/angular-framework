export default {
    host: 'host',
    prefix: 'prefix',
    production: true,
    debugMode: false,
    wsConfig: {
        wsUrl: 'ws://localhost:8181',
        reconnectInterval: 2000, // 2s
        reconnectAttempts: 10 // 10 times
    },
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
