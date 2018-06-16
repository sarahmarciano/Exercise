import React, { Component } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            snackbarOpen: false
        };
    }

    setValue = (event) => this.setState({ value: event.target.value })

    handleClose = () => this.setState({ snackbarOpen: false })

    handleSubmitForm = (e) => {
        e.preventDefault();

        const { value } = this.state;

        fetch('http://localhost:5000/api/example', {
            body: JSON.stringify({ value }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(() => {
            this.setState({ value: '', snackbarOpen: true });
        });
    }

    render() {
        const { value, snackbarOpen } = this.state;
        return (
            <div>
                <form className='Create' onSubmit={this.handleSubmitForm}>
                    <span className='Title'>Please enter a value between 1 and 99</span>
                    <TextField
                        style={{ width: '200px', marginBottom: '50px' }}
                        value={value}
                        onChange={this.setValue}
                        type='number'
                        inputProps={{ min: '1', max: '99' }}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                        disabled={value === ''}
                    >
                        Create
                </Button>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={snackbarOpen}
                    message='Value was successfully saved!'
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            CLOSE
            </Button>
                    ]}
                />
            </div>
        );
    }
}

export default Create;
