package com.taxapp.taxapp.service;

import com.taxapp.taxapp.domain.*;
import com.taxapp.taxapp.repository.*;
import lombok.extern.slf4j.*;
import org.springframework.stereotype.*;

import javax.swing.text.html.*;
import java.awt.print.*;
import java.time.*;
import java.util.*;

@Service
@Slf4j
public class BillService {
private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill createBill(Bill bill){
        log.info("about to create a new bill");
        if(bill.getId()==null){
            bill.setCreatedOn(LocalDateTime.now());
        }

        return billRepository.save(bill);

    }

    public List<Bill> getAll(){
        log.info("About to get all bills");
        List<Bill> allBills=billRepository.findAll();
        log.info("found all bills in the database");
        return allBills;

    }

public Optional<Bill> findById(Long id){
        log.info("Request to find bill with id : {}",id);
        Optional<Bill> billOptional=billRepository.findById(id);
        log.info("found bill {}",billOptional);

        return billOptional;

}

    public List<Bill> search(String text) {
        log.debug("Request to search bills with text : {}", text);
        List<Bill> bills = billRepository.findByNameContaining(text);
        log.info("found all bills containig {}: {}",text,bills);

        return bills;
    }


}
