import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

class Home extends Component {

    state = {
        values: [],
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });
        fetch('http://localhost:5000/api/examples').then(response => {
            response.json().then(data => this.setState({ values: data }));
            this.setState({ loading: false });
        }).catch(() => {
            this.setState({ loading: false });
        })
    }

    render() {
        const { values, loading } = this.state;
        return !loading ? (
            <div className='Values'>
                {values.map(val => {
                    const { ex_id, ex_value } = val;
                    return (
                        <div className='Value' key={ex_id}>
                            <span className='Val'>{ex_value}</span>
                        </div>
                    );
                })}
            </div>
        ) : (
                <div className='Loading'>
                    <CircularProgress size={25} />
                </div>
            );
    }
}

export default Home;
