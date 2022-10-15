package com.taxapp.taxapp.repository;

import com.taxapp.taxapp.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.*;

import java.util.*;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByNameContaining(@Param("text")String text);
}
