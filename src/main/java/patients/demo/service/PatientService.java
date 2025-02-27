package patients.demo.service;

import patients.demo.model.Patient;
import patients.demo.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    // Constructor Injection (better than @Autowired field injection)
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Create a new patient
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Update an existing patient
    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patient.setFirstName(patientDetails.getFirstName());
        patient.setLastName(patientDetails.getLastName());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setGender(patientDetails.getGender());
        patient.setAddress(patientDetails.getAddress());
        patient.setPhoneNumber(patientDetails.getPhoneNumber());

        return patientRepository.save(patient);
    }

    // Delete a patient (checks if the patient exists before deleting)
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found");
        }
        patientRepository.deleteById(id);
    }


    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

}
