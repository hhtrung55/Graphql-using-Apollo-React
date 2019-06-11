import React from "react";
import Link, { IPropsLink } from "./Link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ILink, IData } from "../interface";
import { ApolloError } from "apollo-client";

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`


class LinkList extends React.Component <IPropsLink> {

  _updateCacheAfterVote = (store: any, createVote: any, linkId: any) => {
    const data = store.readQuery({ query: FEED_QUERY })
  
    const votedLink = data.feed.links.find((link: any) => link.id === linkId)
    votedLink.votes = createVote.link.votes
  
    store.writeQuery({ query: FEED_QUERY, data })
  }
  
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }: { loading: boolean, error?: ApolloError, data: IData }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender: ILink[] = data.feed.links;
          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link
                key={link.id}
                link={link}
                index={index}
                updateStoreAfterVote={this._updateCacheAfterVote}
              />
              ))}
            </div>
          )
        }}
      </Query>
    );
  }
}

export default LinkList;
