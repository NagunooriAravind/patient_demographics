import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PatientForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    if (!id) return; // Prevent unnecessary API calls

    try {
      const token = localStorage.getItem('token');
      console.log(`Fetching patient data from: http://localhost:8080/api/patients/${id}`);
      const response = await axios.get(`http://localhost:8080/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const patient = response.data;
      setFirstName(patient.firstName || '');
      setLastName(patient.lastName || '');
      setDateOfBirth(patient.dateOfBirth || '');
      setGender(patient.gender || '');
      setAddress(patient.address || '');
      setPhoneNumber(patient.phoneNumber || '');
    } catch (error) {
      console.error('Error fetching patient data:', error.response || error);
      alert('Failed to fetch patient details. Check the console for more information.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = { firstName, lastName, dateOfBirth, gender, address, phoneNumber };
    const token = localStorage.getItem('token');

    try {
      if (id) {
        console.log(`Sending PUT request to: http://localhost:8080/api/patients/${id}`);
        await axios.put(`http://localhost:8080/api/patients/${id}`, patient, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
      } else {
        console.log('Sending POST request to: http://localhost:8080/api/patients');
        await axios.post('http://localhost:8080/api/patients', patient, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
      }
      navigate('/patients');
    } catch (error) {
      console.error('Error submitting form:', error.response || error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>{id ? 'Edit Patient' : 'Add Patient'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Update' : 'Add'}</Button>
      </Form>
    </Container>
  );
};

export default PatientForm;
