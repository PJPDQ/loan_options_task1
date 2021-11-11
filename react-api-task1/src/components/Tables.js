import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'

const Tables = () => {
    const [universities, setUni] = useState({ unis: []})
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchUniList = async () => {
            const { data } = await axios("http://universities.hipolabs.com/search?country=Australia")

            setUni({unis: data})
            console.log(data);
        }
        fetchUniList()
    }, [setUni])

    const loadData = () => {
        setVisible(prevState => ({
            visible: !prevState.visible
        }));
    }

    const deleteData = () => {
        let n = universities.unis.length-1; //remove the last element
        const newList = universities.unis.slice(0, n);
        setUni({unis: newList});
    }

    const addData = () => {
        let uni = universities.unis.slice(0, 1);
        let addUnis = universities.unis;
        addUnis.push(uni[0]);
        setUni({unis: addUnis});
    }

    return (
        <div>
            <button onClick={loadData}>Load</button>
            <button onClick={addData}>Add</button>
            <button onClick={deleteData}>Delete</button>
           <table>
               <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Domains</th>
                        <th>University Name</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    { visible && universities.unis.map((university, index) => (
                        <tr key={university.name}>
                            <td>{index+1}</td>
                            <td>{university.alpha_two_code}</td>
                            <td>{university.domains[0]}</td>
                            <td>{university.name}</td>
                            <td>{university.web_pages[0]}</td>
                        </tr>
                    ))}
                </tbody>
           </table>
        </div>
    )
}

export default Tables
