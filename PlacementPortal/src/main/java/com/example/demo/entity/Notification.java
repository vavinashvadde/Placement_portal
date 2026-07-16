package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Message is required")
    @Column(nullable = false, length = 1000)
    private String message;

    @NotBlank(message = "Notification date is required")
    @Column(nullable = false)
    private String notificationDate;
    
    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;
    
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    public Notification() {
    }

    public Notification(Long notificationId, String title, String message,
            String notificationDate, Boolean isRead, Student student) {
        this.notificationId = notificationId;
        this.title = title;
        this.message = message;
        this.notificationDate = notificationDate;
        this.isRead = isRead;
        this.student = student;
    }

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNotificationDate() {
        return notificationDate;
    }

    public void setNotificationDate(String notificationDate) {
        this.notificationDate = notificationDate;
    }
    
    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
    
    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public String toString() {
        return "Notification [notificationId=" + notificationId +
                ", title=" + title +
                ", message=" + message +
                ", notificationDate=" + notificationDate +
                ", isRead=" + isRead + "]";
    }
}