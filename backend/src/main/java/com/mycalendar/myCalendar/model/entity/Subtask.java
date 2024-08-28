package com.mycalendar.myCalendar.model.entity;

import com.mycalendar.myCalendar.model.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a Subtask entity with properties for id, title, description, and completion status.
 * Utilizes Lombok annotations for boilerplate code reduction.
 */
@NoArgsConstructor
@Data
@Entity
@Table(name = "subtasks")
public class Subtask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to the Task entity
    @ManyToOne(fetch = FetchType.LAZY)
    private Task task;

    // Title of the subtask
    private String title;

    // Description of the subtask
    private String description;

    private TaskStatus status;
}