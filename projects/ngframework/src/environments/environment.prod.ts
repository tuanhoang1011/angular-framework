import base from './environment.base';

export const environment = {
    ...base,
    env: 'prod',
    aws_appsync: {
        API: {
            aws_appsync_graphqlEndpoint: '',
            aws_appsync_region: base.aws_appsync.API.aws_appsync_region,
            aws_appsync_authenticationType: base.aws_appsync.API.aws_appsync_authenticationType
        }
    }
};