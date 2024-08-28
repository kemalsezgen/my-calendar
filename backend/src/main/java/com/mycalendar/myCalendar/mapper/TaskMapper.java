package com.mycalendar.myCalendar.mapper;

import com.mycalendar.myCalendar.model.entity.Task;
import com.mycalendar.myCalendar.model.dto.TaskDTO;

public class TaskMapper {

    public static TaskDTO toTaskDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setTitle(task.getTitle());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setStartDate(task.getStartDate());
        taskDTO.setEndDate(task.getEndDate());
        taskDTO.setStatus(task.getStatus());
        taskDTO.setSubtasks(SubtaskMapper.toSubtaskDTOList(task.getSubtasks()));
        return taskDTO;
    }

    public static Task toTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setId(taskDTO.getId());
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStartDate(taskDTO.getStartDate());
        task.setEndDate(taskDTO.getEndDate());
        task.setStatus(taskDTO.getStatus());
        task.setSubtasks(SubtaskMapper.toSubtaskList(taskDTO.getSubtasks()));
        return task;
    }
}
