import { JwtService } from './../services/jwt.service';
import {NgModule} from '@angular/core';
// apollo-angular contains the bindings to use Apollo Client with Angular.
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
// apollo-angular-link-http provides a similar HttpLink to Apollo’s HttpLink with one difference, it uses Angular’s HttpClient.
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
// apollo-cache-inmemory is a cache implementation that supports all of Apollo Client 1.0’s features without the dependency on Redux.
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';


const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
const middleware = new ApolloLink((operation, forward) => {
  const token =window.localStorage['jwtToken'];
  if (token) {
    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
  return forward(operation);
});
export function createApollo(httpLink: HttpLink) {
  const cache = new InMemoryCache(
    {
    dataIdFromObject: o => o.id
  }
  );

  const http =  httpLink.create({ uri });
  let link= middleware.concat(http)
  return {
    link: link,
    cache: cache,
  };
}

@NgModule({
  exports: [ HttpClientModule,ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  
}
// https://stackoverflow.com/questions/27810927/mongodb-data-structure-on-posts-comments-save-and-likes
// https://wrappixel.com/demos/angular-admin-templates/material-angular/material/dashboards/dashboard2
// https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard
// https://github.com/syndesis/angular-graphql-demo/tree/master/src/app/api
// https://blog.mvp-space.com/authentication-and-authorization-boilerplate-with-apollo-2-0-part-3-ee69e60daa76
// https://github.com/KillerCodeMonkey/ngx-quill
// https://github.com/graphql/dataloader/blame/68a2a2e9a347ff2acc35244ae29995ab625b2075/README.md#L88
// https://itnext.io/angular-subjects-8ed5bf7c4f00
// https://netbasal.com/advanced-angular-implementing-a-reusable-autocomplete-component-9908c2f04f5
// https://forums.meteor.com/t/best-practices-for-optimization-of-regex-searches-on-server-side/30275/3
//https://medium.com/statuscode/how-to-speed-up-mongodb-regex-queries-by-a-factor-of-up-to-10-73995435c606
// https://udemy-certificate.s3.amazonaws.com/pdf/UC-CJ4PVX8U.pdf
// https://www.howtographql.com/angular-apollo/6-more-mutations-and-updating-the-store/
// https://www.graph.cool/docs/reference/graphql-api/query-api-nia9nushae/
// https://www.apollographql.com/docs/angular/features/caching/