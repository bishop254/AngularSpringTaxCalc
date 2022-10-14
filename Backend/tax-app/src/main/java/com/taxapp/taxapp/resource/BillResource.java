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
}
