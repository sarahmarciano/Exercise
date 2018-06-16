import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { AppBar,  Tabs, Tab } from '@material-ui/core';

class Nav extends Component {
    state = {
        value: 0,
    };

    componentWillMount() {
        const { location } = this.props.history;
        if(location.pathname === '/new') {
            this.setState({ value: 1 });
        }
    }

    handleChange = (event, value) => {
        const { history } = this.props;
        this.setState({ value });
        if (value === 0) {
            history.replace('/');
        } else if (value === 1) {
            history.replace('/new');
        }
    };

    render() {
        const { value } = this.state;
        return (
            <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab label='Display' />
                    <Tab label='Insert' />
                </Tabs>
            </AppBar>
        );
    }
}

export default withRouter(Nav);
