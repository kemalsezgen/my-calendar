package com.mycalendar.myCalendar.mapper;

import com.mycalendar.myCalendar.model.entity.Subtask;
import com.mycalendar.myCalendar.model.dto.SubtaskDTO;

import java.util.List;
import java.util.stream.Collectors;

public class SubtaskMapper {
    public static SubtaskDTO toSubtaskDTO(Subtask subtask) {
        SubtaskDTO subtaskDTO = new SubtaskDTO();
        subtaskDTO.setId(subtask.getId());
        subtaskDTO.setTitle(subtask.getTitle());
        subtaskDTO.setDescription(subtask.getDescription());
        subtaskDTO.setStatus(subtask.getStatus());
        return subtaskDTO;
    }

    public static Subtask toSubtask(SubtaskDTO subtaskDTO) {
        Subtask subtask = new Subtask();
        subtask.setId(subtaskDTO.getId());
        subtask.setTitle(subtaskDTO.getTitle());
        subtask.setDescription(subtaskDTO.getDescription());
        subtask.setStatus(subtaskDTO.getStatus());
        return subtask;
    }

    public static List<SubtaskDTO> toSubtaskDTOList(List<Subtask> subtasks) {
        return subtasks.stream().map(SubtaskMapper::toSubtaskDTO).collect(Collectors.toList());
    }

    public static List<Subtask> toSubtaskList(List<SubtaskDTO> subtaskDTOs) {
        return subtaskDTOs.stream().map(SubtaskMapper::toSubtask).collect(Collectors.toList());
    }
}
