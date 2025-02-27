package patients.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import patients.demo.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}