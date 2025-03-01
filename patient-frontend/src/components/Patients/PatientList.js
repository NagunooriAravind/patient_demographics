import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PatientItem from './PatientItem';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to view patients.');
      window.location.href = '/login'; // Redirect to login page
    } else {
      fetchPatients();
    }
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Failed to fetch patients. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deletePatient = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPatients(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Patients</h2>
      <Link to="/patients/new" className="btn btn-primary mb-3">Add New Patient</Link>
      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <PatientItem
                key={patient.id}
                patient={patient}
                onDelete={deletePatient}
              />
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PatientList;