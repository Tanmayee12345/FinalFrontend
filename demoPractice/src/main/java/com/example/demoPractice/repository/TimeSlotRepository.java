package com.example.demoPractice.repository;




import com.example.demoPractice.model.TimeSlot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotRepository extends MongoRepository<TimeSlot, String> {
}
