import React from 'react';
import styles from './App.module.css';

import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api';
import covidImage from './Images/image.png';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            country: ''
        }
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        // Fetch Data
        const fetchedData = await fetchData(country);
        
        // Set The State
        this.setState({ data: fetchedData, country: country });
    }

    render() {

        const { data, country } = this.state;

        return(
            <div className={ styles.container }>
                <img className={ styles.image } src={ covidImage } alt="Covid-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={ this.handleCountryChange } />
                <Charts data={ data } country={ country } />
            </div>
        )
    }
}

export default App;