import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './Appshell';
import Home from './Home';
import FeatureWords from './FeatureWords';
import '../index.css'

class App extends React.Component {
    render() {
        return(
            <Router>
                <AppShell>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/words" component={FeatureWords}/>
                    </div>
                </AppShell>
            </Router>
        );
    }
}

export default App;

