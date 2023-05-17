import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Apollo, APOLLO_OPTIONS, ApolloModule, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AppModule } from '../../app.module';
import { LogMessage, LogSubType, LogType } from '../constants/log.const';
import { LogContent } from '../models/log.model';
import { AuthService } from '../services/auth.service';
import { LogService } from '../services/log.service';

@Injectable({
    providedIn: 'root'
})
export abstract class GraphQLBaseService {
    constructor(private apollo: Apollo) {
    }

    executeStatement<RequestType, ResponseType>(
        statement: string,
        functionName: string,
        model?: RequestType
    ): Observable<ResponseType> {
        const response = this.apollo.subscribe<RequestType, any>({
            query: gql`
                ${statement}
            `,
            variables: { ...model, functionName } as any
        }) as any;

        return response as Observable<ResponseType>;
    }
}

export const createDefaultApollo = (http: HttpLink): ApolloClientOptions<any> => {
    // use apollo client with aws appasync
    const url = environment.aws_appsync.API.aws_appsync_graphqlEndpoint ?? '';
    const region = environment.aws_appsync.API.aws_appsync_region ?? '';
    const auth = {
        type: environment.aws_appsync.API.aws_appsync_authenticationType ?? AUTH_TYPE.NONE,
        token: AppModule.injector.get(AuthService).idToken
    } as AuthOptions;

    // create http
    const httpLink = http.create({
        uri: url
    });

    // general handling  when an error occurs
    const errorLink = onError(({ networkError, operation }) => {
        if (networkError) {
            const err = (networkError ?? LogMessage.Unknown) as any;
            AppModule.injector.get(LogService).error(LogType.Error, {
                subType: LogSubType.APIError,
                apiName: (operation.variables as any).functionName,
                errorContent:
                    err.hasOwnProperty('errors') && err.errors[0].hasOwnProperty('message')
                        ? err.errors[0]
                        : navigator.onLine
                        ? LogMessage.Unknown
                        : LogMessage.NoNetwork
            } as LogContent);
        }
    });

    const link = ApolloLink.from([
        errorLink,
        createAuthLink({ url, region, auth } as any),
        createSubscriptionHandshakeLink({ url, region, auth } as any, httpLink as any)
    ]);

    return {
        connectToDevTools: !environment.production,
        assumeImmutableResults: true,
        cache: new InMemoryCache({}),
        link,
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all'
            }
        }
    };
};

@NgModule({
    imports: [BrowserModule, HttpClientModule, ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createDefaultApollo,
            deps: [HttpLink]
        }
    ]
})
export class GraphQLBaseModule {}
