import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import '../index.css'

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
});

const databaseURL = "https://respectable-compromises.firebaseio.com/"

class FeatureWords extends React.Component {
    constructor() {
        super();
        this.state = {
            neighborhood: {},
            dialog: false,
            name: '',
            neighbor: '',
            word: ''
        };
    }

    _get() {
        fetch(`${databaseURL}/neighborhood.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(neighborhood => this.setState({neighborhood: neighborhood}));
    }

    _post(neighbor) {
        return fetch(`${databaseURL}/neighborhood.json`, {
            method: 'POST',
            body: JSON.stringify(neighbor)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.neighborhood;
            nextState[data.name] = neighbor;
            this.setState({neighborhood: nextState});
        });
    }

    _delete(id) {
        return fetch(`${databaseURL}/neighborhood/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.neighborhood;
            delete nextState[id];
            this.setState({neighborhood: nextState});
        });
    }

    componentDidMount() {
        this._get();
    }

    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit = () => {
        const neighbor = {
            name: this.state.name,
            neighbor: this.state.neighbor,
            word: this.state.word
        }

        this.handleDialogToggle();
        if(!neighbor.name && !neighbor.neighbor && !neighbor.word) {
            return;
        }
        this._post(neighbor);
    }

    handleDelete = (id) => {
        this._delete(id);
    }

    componentDidMount() {
        this._get();
    }

    render() {
        const {classes} = this.props;
        return(
            <div>
                {Object.keys(this.state.neighborhood).map(id => {
                    const neighbor = this.state.neighborhood[id];
                    return(
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        NAME: {neighbor.name}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        NEIGHBORHOOD: {neighbor.neighbor}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                                {neighbor.word}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>delete</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <br/>
                        </div>
                    );
                })}
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon />
                </Fab>
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <DialogTitle>Add Your Data</DialogTitle>
                    <DialogContent>
                        <TextField label="Name" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                        <TextField label="Neighbor" type="text" name="neighbor" value={this.state.neighbor} onChange={this.handleValueChange}/><br/>
                        <TextField label="Word" type="text" name="word" value={this.state.word} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Add</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FeatureWords);

