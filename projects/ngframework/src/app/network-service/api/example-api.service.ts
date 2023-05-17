import { Injectable } from '@angular/core';

import { APIName, APIRoutes } from '../../core/constants/api-routes';
import { GraphQLBaseService } from '../../core/services/graphQL-base.service';
import { HttpBaseService } from '../../core/services/http-base.service';

@Injectable({
    providedIn: 'root'
})
export class ExampleAPIService extends HttpBaseService {
    constructor(private graphQLBaseService: GraphQLBaseService) {
        super();
    }

    pushLogs(logs: any[]) {
        return super
            .post<{ Items: any[] }, boolean>(APIRoutes.Log, APIName.LogPOST, { Items: logs })
            .subscribe((res) => {
                res;
            });
    }

    createCommentSubscription(userID: string) {
        const statement = `subscription CreateComment($userID: String) {
            createComment(UserUID: $userID) {
                UserUID
                TopicID
                CommentID
            }
        }`;

        return this.graphQLBaseService.executeStatement<any, any>(statement, 'Subcrice Creating Comment', {
            userID: userID
        });
    }

    createCommentMutation(userID: string, topicID: string) {
        const statement = `mutation CreateComment($userID: String!, $topicID: String!) {
            createComment(UserUID: $userID, TopicID: $topicID) {
                UserUID
                TopicID
                CommentID
            }
        }`;

        return this.graphQLBaseService.executeStatement<any, any>(statement, ' Create Comment', {
            userID: userID,
            topicID: topicID
        });
    }
}
