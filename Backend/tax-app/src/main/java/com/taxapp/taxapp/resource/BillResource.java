package com.taxapp.taxapp.resource;

import com.taxapp.taxapp.domain.*;
import com.taxapp.taxapp.service.*;
import lombok.extern.slf4j.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.awt.print.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@Slf4j
public class BillResource {
    private final BillService billService;

    public BillResource(BillService billService) {
        this.billService = billService;
    }

    @PostMapping("/bill")
    ResponseEntity<Bill> createBill(@RequestBody Bill bill){
        log.info("Request to create a bill");

        Bill newBill= billService.createBill(bill);
        return new ResponseEntity<>(newBill,HttpStatus.OK);
    }
    @PostMapping("/bills")
    ResponseEntity<List<Bill>> createBills(@RequestBody List<Bill> bills){
        log.info("Request to create a bill");

        List<Bill> newBills= billService.saveListOfBills(bills);
        return new ResponseEntity<>(newBills,HttpStatus.OK);
    }

    @GetMapping("/bill")
    ResponseEntity<List<Bill>> findAll(){
        log.info("Request to find all bills");

        List<Bill> allBills=billService.getAll();
        return new ResponseEntity<>(allBills,HttpStatus.OK);

    }

    @GetMapping("/bill/{id}")
    public Optional<Bill> findById(@PathVariable Long id){
        Optional<Bill> billOptional=billService.findById(id);
        return billOptional;
    }

    @GetMapping(path= "/bill/search")
    public List<Bill> findAll(@RequestParam(required = false) String text) {
        log.debug("REST request to search all bills with text : {}", text);

        if (text  == null) {
            text = "";
        }

        return billService.search(text);
    }

    @DeleteMapping(path="/bill/{id}")
    ResponseEntity delete(@PathVariable("id") Long id){
        log.info(" About to delete bill with id :  {}",id);
        Bill deletedMember=billService.delete(id);
        return new ResponseEntity(deletedMember,HttpStatus.OK);
    }

    @PutMapping("/bill/{id}")
    ResponseEntity update(@RequestBody Bill bill, @PathVariable Long id){
        log.info("Request to update  bill with id: {}",id);
        Optional<Bill> updatedBill=null;
        updatedBill=billService.update(id,bill.getName(),bill.getAmount());
        log.info("updated bill: {}",updatedBill);
        return new ResponseEntity<>(updatedBill,HttpStatus.OK);
    }

}
