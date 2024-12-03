package com.example.demoPractice.repository;



import com.example.demoPractice.model.ClassEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends MongoRepository<ClassEntity, String> {
    boolean existsByClassName(String className);
}

