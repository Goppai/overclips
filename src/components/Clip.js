import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import ClipPreview from './ClipPreview';
import Error from './Error';

import { GET_CLIP } from '../graphql/GetClip';

const ClipContainer = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

const Comments = styled.aside`
  margin-top: 32px;
  font-size: 12px;
  color: #727272;
`;

export default function Clip({ match }) {
  return (
    <Query
      query={GET_CLIP}
      fetchPolicy="cache-first"
      variables={{ pk: 'feed', sk: match.params.id }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <span>loading</span>; //<ClipPreview />;
        }

        if (error) {
          return <Error message={error.message} />;
        }

        if (!data.getClip) {
          return <Error message="Clip could not be loaded." />;
        }

        return (
          <ClipContainer>
            <ClipPreview
              clip={data.getClip}
              isVisible={true}
              isScrolling={false}
              isLink={false}
            />
            <Comments>Reddit comments coming soon...</Comments>
          </ClipContainer>
        );
      }}
    </Query>
  );
}
