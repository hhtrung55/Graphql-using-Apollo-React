import React, { Component } from "react";

// import { IProps } from "../interface";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { IVote } from "../interface";

export interface IPropsLink {
  index: number;
  link: {
    id: string;
    votes: IVote[];
    postedBy: {
      name: string;
    };
    description: string;
    url: string;
    createdAt: string;
  };
  updateStoreAfterVote: any;
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class Link extends Component<IPropsLink> {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              update={(store: any, { data: { vote } }: any) =>
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }
            >
              {(voteMutation: any) => (
                <div className="ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes | by{" "}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : "Unknown"}{" "}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
  _voteForLink(): void {
    throw new Error("Method not implemented.");
  }
}

export default Link;
