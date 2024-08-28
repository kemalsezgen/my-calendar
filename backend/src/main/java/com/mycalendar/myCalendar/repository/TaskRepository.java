package com.mycalendar.myCalendar.repository;

import com.mycalendar.myCalendar.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
