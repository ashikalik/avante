import { Injectable } from '@angular/core';


@Injectable()
export class PrintBadge {

    constructor() {
    }


    public ticket: any;


    public BuildInvoice(ticket: any) {

        this.ticket = ticket;

        return `
            ` + this.Body() + `
        `;
    }

    public Body() {
        return `
            <body onload="window.print();window.close()">
                  <div style="width: 8cm; height: 12cm;  display: block; margin: auto;">
                      <div style="padding-top: 5cm; padding-left: 0.4cm; padding-right: 0.4cm; font-size:30px;">
                        <p style="text-align: center;">` + this.ticket.first_name + ' ' + this.ticket.last_name + `</p>
                        <img src="` + this.ticket.img_url + `" height="75" width="75" style="display: block; margin: auto;" />
                      </div>
                   </div>
            </body>
        `;
    }


    public BuildInvoiceForCosmos(ticket: any) {
        this.ticket = ticket;

        return `
                    ` + this.CosmosBody() + `
                `;
    }


    public CosmosBody() {
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            
            <style>
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                color: #555;
            }
            
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }
            
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
            
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
            
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
            
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
            
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
            
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
            
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
            
            .invoice-box table tr.item td{
                border-bottom: 1px solid #eee;
            }
            
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
            
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
            
            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
                
                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
            
            /** RTL **/
            .rtl {
                direction: rtl;
                font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            }
            
            .rtl table {
                text-align: right;
            }
            
            .rtl table tr td:nth-child(2) {
                text-align: left;
            }
            </style>
        </head>
        
        <body onload="window.print();window.close()">
            <div class="invoice-box rtl">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <td colspan="2">
                            <table>
                                <tr>

                                    <td class="title">
                                    <img src="https://s3.eu-central-1.amazonaws.com/eventoapps/image/y8iqs8ihric6l36ualtivr81seamuc" style="width:100%; max-width:200px;">
                                     </td>

                                    
                                    
                                    <td>
                                        Invoice #: ` + this.ticket.invoice_id + `<br>
                                        Created: ` + this.ticket.created_at + `<br>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                            <td class="title">
                        </td>
                                
                                <td>
 
                                </td>
                            </tr>
                    </table>
                    </td>
                    </tr>
                    
                    

                    
                    <tr class="heading">
                        <td>
                            بيانات التذكرة
                        </td>
                        
                        <td>
                            سعر التذكرة
                        </td>
                    </tr>
                    
                    <tr class="details">
                        <td >
                        ` + this.ticket.package_name + `
                        </td>
                        
                        <td>
                        ` + this.ticket.price + `
                        </td>
                    </tr>
                    
                    <tr class="heading">
                        <td>
                            الإسم
                        </td>
                        
                        <td>
                        </td>
                    </tr>
                 
                    

                    <tr class="item">
                        <td>
                            ` + this.ticket.first_name + ' ' + this.ticket.last_name + `
                        </td>
                        
                        <td>
                        <img src="` + this.ticket.img_url + `" height="75" width="75" style="display: block; margin: auto;" />
                     </td>
                    </tr>


                        </table>
                    </td>
                </tr>
                <br>
                <br>
                <br>
                <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                        <td class="title">
                        <img src="https://6.top4top.net/p_1253p0vkf1.png" style="width:50%; max-width:100px;">
                    </td>
                            
                            <td>
                                Evento<br>
                                www.evento.sa<br>
                                info@evento.sa
                            </td>
                        </tr>
                </table>
                </td>
                </tr>
            </div>
        </body>
        </html>
        `;
    }

}
