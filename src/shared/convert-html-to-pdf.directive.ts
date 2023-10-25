import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import html2PDF from 'jspdf-html2canvas';

@Directive({
  selector: '[appConvertHtmlToPdf]'
})
export class ConvertHtmlToPdfDirective {
  @Input() filename:string = ''
  @Input() htmlContainerId:string = ''

  constructor(private elementRef:ElementRef) { }

  @HostListener('click')
  onClick(){
    this.convetHtmlToPDF(this.htmlContainerId , this.filename)
  }

  public convetHtmlToPDF(id: string, filename: string) {
    var page = document.getElementById(id);// document.getElementById('contentToConvert');
    console.log(id , " file " , filename);
    html2canvas(page as HTMLElement).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`${filename}.pdf`); // Generated PDF
    });

    // html2PDF(page as HTMLElement, {
    //   jsPDF: {
    //     format: 'a4',
    //   },
    //   imageType: 'image/jpeg',
    //   output: `${this.filename}.pdf`
    // });
  }


}
