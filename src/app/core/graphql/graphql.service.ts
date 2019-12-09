import { Injectable } from '@angular/core';
// apollo-angular contains the bindings to use Apollo Client with Angular.
import { Apollo, QueryRef } from 'apollo-angular';
// apollo-client is the Apollo Client library
import { FetchPolicy, MutationUpdaterFn } from 'apollo-client';
import { Observable } from 'rxjs';
// graphql contains Facebook’s reference implementation of GraphQL - Apollo Client uses some of its functionality as well.
import { DocumentNode } from 'graphql';

@Injectable({
    providedIn: 'root'
})
export class GraphqlService {
    constructor(private apollo: Apollo) { }

    query(
        query,
        variables: Object = {},
        fetchPolicy: FetchPolicy = 'cache-first'
    ): QueryRef<any> {
        return this.apollo.watchQuery({
            query,
            variables,
            fetchPolicy,
            errorPolicy: 'all'
        });
    }

    mutate(
        mutation,
        variables: Object = {},
        update?: MutationUpdaterFn,
    ): Observable<any> {
        return this.apollo.mutate({
            mutation,
            variables,
            update,
            errorPolicy: 'all'
        });
    }
}
