package com.mycalendar.myCalendar.model.entity;

import com.mycalendar.myCalendar.model.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Represents a Task entity with properties for id, title, description, subtasks, completion status, start date, and end date.
 * Utilizes Lombok annotations for boilerplate code reduction.
 */
@NoArgsConstructor
@Data
@Entity
@Table(name = "tasks")
public class Task {

    // Auto-incremented primary key for the Task entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of the task
    private String title;

    // Description of the task
    private String description;

    // List of subtasks associated with the task
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Subtask> subtasks;

    private TaskStatus status;

    // Start date of the task
    private String startDate;

    // End date of the task
    private String endDate;
}