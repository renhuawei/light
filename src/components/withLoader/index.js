import React from 'react';
import Loader from 'components/Loader';

function withLoader(WrappedComponent, request) {
  return class PageContainer extends React.Component {
    state = { status: 'loading' };

    async componentDidMount() {
      const { data } = await request(this.props.match);
      this.setState({ status: 'loaded', data });
    }

    render() {
      if (this.state.status === 'loading') {
        return <Loader>Loading...</Loader>;
      }

      return <WrappedComponent {...this.props} data={this.state.data} />;
    }
  };
}

export default withLoader;
