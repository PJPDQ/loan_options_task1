import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Tables = () => {
    const url = "http://universities.hipolabs.com/search?country=Australia";
    const [universities, setUni] = useState({ unis: []})
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios.get(url)
          .then(response => {
            const output = [...new Map(response.data.map(o => [o.name, o])).values()]
            setUni({unis: output})
          })
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

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Country Code</StyledTableCell>
            <StyledTableCell align="right">Domains</StyledTableCell>
            <StyledTableCell align="right">University Name</StyledTableCell>
            <StyledTableCell align="right">Website</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visible && universities.unis.map((row, index) => (
            <StyledTableRow key={index + row.name}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.alpha_two_code}</StyledTableCell>
              <StyledTableCell align="right"><ul>{row.domains.map((domain) => (
                  <li key={index+domain}>{domain}</li>
              ))}</ul></StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right"><ul>{row.web_pages.map((web, index) => (
                  <li key={index+web}>{web}</li>
              ))}</ul></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           {/* <table>
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
           </table> */}

           {/* <MaterialTable columns={columns} data={universities.unis} title="Top University in Australia" /> */}
        </div>
    )
}

export default Tables
