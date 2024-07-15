import React, { useEffect, useState } from 'react';
import './App.css'

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5173/Test.json')
            .then(response => {
                console.log('Fetch response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);
    

    const sortData = (key) => {
        let sortedData = [...data];
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            sortedData.reverse();
            setSortConfig({ key, direction: 'descending' });
        } else {
            sortedData.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
            setSortConfig({ key, direction: 'ascending' });
        }
        setData(sortedData);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error fetching data: {error.message}</div>;
    }

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortData('id')}>ID</th>
                        <th onClick={() => sortData('firstName')}>First Name</th>
                        <th onClick={() => sortData('lastName')}>Last Name</th>
                        <th onClick={() => sortData('birthday')}>Birthday</th>
                        <th onClick={() => sortData('gender')}>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.birthday}</td>
                            <td>{item.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
