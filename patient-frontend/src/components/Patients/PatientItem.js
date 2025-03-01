import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PatientItem = ({ patient, onDelete }) => {
  return (
    <tr>
      <td>{patient.id}</td>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>
        <Link to={`/patients/${patient.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
        <Button variant="danger" size="sm" onClick={() => onDelete(patient.id)}>Delete</Button>
      </td>
    </tr>
  );
};

export default PatientItem;