import { Component, OnInit, ElementRef } from '@angular/core';
import { ContactsService } from '../service/contacts.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.css']
})
export class ExceluploadComponent implements OnInit {
  sheetJsExcelName: any;
  sheetBufferRender: File;
  isEmptyDrop: boolean;
  isExcelDrop: boolean;
  origExcelData: any[];
  localWorkBook: XLSX.WorkBook;
  sheetNameForTab: string[];
  totalPage: number;
  selectDefault: string;
  localwSheet: XLSX.WorkSheet;
  sheetCellRange: XLSX.Range;
  sheetMaxRow: number;
  refExcelData: any[];
  excelTransformNum: any[];
  excelDataEncodeToJson: any[];

  constructor(
    private APIService: ContactsService
  ) { }

  ngOnInit(): void {
  }

  excelUploadOnClick(evt) {
    const target: HTMLInputElement = evt.target;
    if (target.files.length === 0) {
      throw new Error('Please check file formate');
    }
    if (target.files.length > 1) {
      throw new Error('Cannot use multiple files');
    }
    this.sheetJsExcelName = evt.target.files.item(0).name;
    const reader: FileReader = new FileReader();
    this.readExcelData(reader);
    reader.readAsArrayBuffer(target.files[0]);
    this.sheetBufferRender = target.files[0];
    this.isEmptyDrop = false;
    this.isExcelDrop = true;
  }

  readExcelData(reader, index = 0) {
    this.origExcelData = [];
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const wBook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      this.localWorkBook = wBook;
      const wsname: string = wBook.SheetNames[index];
      this.sheetNameForTab = wBook.SheetNames;
      this.totalPage = this.sheetNameForTab.length;
      this.selectDefault = this.sheetNameForTab[index];
      const wSheet: XLSX.WorkSheet = wBook.Sheets[wsname];
      this.localwSheet = wSheet;
      this.sheetCellRange = XLSX.utils.decode_range(wSheet['!ref']);
      this.sheetMaxRow = this.sheetCellRange.e.r;
      this.origExcelData = <AOA>XLSX.utils.sheet_to_json(wSheet, {
        header: 1,
        range: wSheet['!ref'],
        raw: true,
      });
      this.refExcelData = this.origExcelData.slice(1).map(value => Object.assign([], value));
      this.excelTransformNum = ['first_name', 'last_name', 'email'];
      this.excelDataEncodeToJson = this.refExcelData.slice(0).map(item =>
        item.reduce((obj, val, i) => {
          obj[this.excelTransformNum[i]] = val;
          return obj;
        }, {}),
      );
      console.log('this.excelDataEncodeToJson '+ JSON.stringify(this.excelDataEncodeToJson))
      this.APIService.createContactService(this.excelDataEncodeToJson).then(
        data => {
          console.log("res "+JSON.stringify(data));
      })
    };
  }

}
