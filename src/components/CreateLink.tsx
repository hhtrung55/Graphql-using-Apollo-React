import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { IPropsCreateLink } from "../interface";
import { FEED_QUERY } from "./LinkList";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends React.Component<IPropsCreateLink> {
  state = {
    description: "",
    url: ""
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
          update={(store: any, { data: { post }} : any  ) => {
            const fet = store.readQuery({ query: FEED_QUERY });
            fet.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              fet
            });
          }}
        >
          {(postMutation: any) => (
            <button onClick={postMutation}>Submit</button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
