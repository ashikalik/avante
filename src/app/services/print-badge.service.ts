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

}
