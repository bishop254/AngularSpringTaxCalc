package com.taxapp.taxapp.domain;

import lombok.*;

import javax.persistence.*;
import java.time.*;

@Entity
@Data
@Table(name="bill")
@NoArgsConstructor

public class Bill {
    public Bill(Long id, String name, Integer amount) {
        this.id = id;
        this.name = name;
        this.amount = amount;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer amount;

    private LocalDateTime createdOn;
}
