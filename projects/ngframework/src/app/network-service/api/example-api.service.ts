import { Injectable } from '@angular/core';
import { GraphQLBaseService } from '../../core/services/communicate-server/graphQL-base.service';

import { HttpBaseService } from '../../core/services/communicate-server/http-base.service';
import { APIName, APIRoutes } from '../api-routes';

@Injectable({
    providedIn: 'root'
})
export class ExampleAPIService extends HttpBaseService {
    constructor(private graphQLBaseService: GraphQLBaseService) {
        super();
    }

    pushLogs(logs: any[]) {
        return super.post<{ Items: any[] }, boolean>(APIRoutes.Log, APIName.LogPOST, { Items: logs }).subscribe({
            next: (res) => {
                res;
            }
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

        return this.graphQLBaseService.subscription<CommentCRUDRequest, CommentCRUDResponse>(
            statement,
            'Subcrice Creating Comment',
            {
                userID: userID
            }
        );
    }

    async createCommentMutation(userID: string, topicID: string) {
        const statement = `mutation CreateComment($userID: String!, $topicID: String!) {
            createComment(UserUID: $userID, TopicID: $topicID) {
                UserUID
                TopicID
                CommentID
            }
        }`;

        return await this.graphQLBaseService.mutation<CommentCRUDRequest, CommentCRUDResponse>(
            statement,
            ' Create Comment',
            {
                userID: userID,
                topicID: topicID
            }
        );
    }
}
