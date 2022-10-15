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

    public List<Bill> saveListOfBills(List<Bill> bills){

        for (Bill bill:bills){
            billRepository.save(bill);
            bill.setCreatedOn(LocalDateTime.now());
        }

        return bills;

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

public Bill delete(Long id) {
    boolean exist = billRepository.existsById(id);
    if (!exist) {
        throw new IllegalStateException("bill doesn't exist");

    }
    billRepository.deleteById(id);
    return null;
}

    public Optional<Bill> update(Long id, String name, Integer amount) {
        Optional<Bill> billOptional=billRepository.findById(id);
        log.info("bill found with id {}", id);
        if (billOptional.isPresent()) {
            Bill bill = billOptional.get();
            if (id != null && id > 0 && !Objects.equals(billOptional.get(), id)) {
                bill.setId(id);

            }
            if (name != null && name.length() > 0 && !Objects.equals(billOptional.get(), name)) {
                bill.setName(name);

            }
            if (amount != null && id > 0 && !Objects.equals(billOptional.get(), amount) ){
                bill.setAmount(amount);

            }
            bill=billRepository.save(bill);
            return Optional.of(bill);
        }

        return billOptional;
    }


}
