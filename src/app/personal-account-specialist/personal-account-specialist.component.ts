import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../service/token-storage.service";
import {UserService} from "../service/user.service";
import {CalendarDay} from "../models/calendar";
import {DomSanitizer} from "@angular/platform-browser";
import {SpecialistService} from "../service/specialist.service";
import {Service_specialist} from "../models/service_specialist";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {Location} from "@angular/common";
import {OrderService} from "../service/order.service";
import {Router} from "@angular/router";


// @ts-ignore
@Component({
  selector: 'app-personal-account-specialist',
  templateUrl: './personal-account-specialist.component.html',
  styleUrls: ['./personal-account-specialist.component.css']
})
export class PersonalAccountSpecialistComponent implements OnInit {
  user: any
  specialization:any;
  specialization_id: any;
  id:any;
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  services_up: any[] = [];
  calendarOrderData: any[] = [];
  public displayMonth!: string;
  private monthIndex: number = 0;
  public showControls: boolean = false;
  public showCalendar: boolean = false;
  public showOrders = false;
  public showServiceList: boolean = false;
  public specialist_services!: Service_specialist[];
  selectedService: any;
  showPortfolio: boolean = false;
  showEditProfile = false;
  showEditName = false;
  showEditPhoto = false;
  showContextMenu: boolean = false;
  specialistData:  any = {};
  fileObj!: File;
  editServiceSpecialist = false;
  editFieldId: string | null = null;
  showFileInput = false;
  filesToUpload!: File[];
  orders: any[] = [];
  showControlsOrder =false;

  // Функция для отображения/скрытия контекстного меню
  toggleContextMenu(): void {
    this.showContextMenu = !this.showContextMenu;
    console.log('menu')
  }

  editSpecialistServiceMethod():void{
    this.editServiceSpecialist = !this.editServiceSpecialist;
  }

  constructor(private orderService: OrderService, private location: Location, private tokenService: TokenStorageService, private userService: UserService, private specialistService:SpecialistService, public sanitizer: DomSanitizer, public router: Router) { }
  showEditProfileFun(): void {
    this.showEditProfile = !this.showEditProfile;
  }
  showEditPhotoFun():void {
    this.showEditPhoto = !this.showEditPhoto;
  }
  showEditFun():void {
    this.showEditName = !this.showEditName;
  }
  ngOnInit(): void {
    this.getUser();
    this.generateCalendarDays(this.monthIndex);
    this.toggleCalendar();
    this.toggleServiceList();
  }
  getUser(): void {
    const userId = this.tokenService.getUserId();
    this.userService.getSpecialist(userId).subscribe(
      data => {
        this.user = data;
        this.specialization_id = this.user.id_specialization;
        this.getSpecialization(this.specialization_id);
        this.getServiceSpecialist(this.user.id)
        console.log(this.user)
        this.orderService.getOrdersSpecialist(this.user.id).subscribe(
          orders => {
            this.orders = orders;
          },
          error => {
            console.log(error);
          }
        );
        this.specialistService.calendarSpecialist(this.user.id)
          .subscribe(
            data => {
              this.calendarOrderData = data;
              this.updateCalendar();
            },
            error => {
              console.error('An error occurred while retrieving calendar data:', error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );

  }

  private getSpecialization(id: any) {
    this.userService.getSpecialization(id).subscribe(
      data => {
        this.specialization = data.name;
        console.log(this.specialization)
      },
      error => {
        console.log(error);
      }
    );

  }

  toggleCalendar(): void {
    this.showCalendar = true;
    this.showServiceList = false;
    this.showOrders = false;
  }

  toggleServiceList(): void {
    this.showServiceList = true;
    this.showCalendar = false;
    this.showOrders = false;
  }
  toggleOrder(): void{
    this.showOrders = true;
    this.showServiceList = false;
    this.showCalendar = false;
  }

  toggleEditMode(service: any) {
    if (this.editServiceSpecialist && this.selectedService === service) {
      this.editServiceSpecialist = false;
      this.selectedService = null;

      const updatedService = {
        time_services: service.time_services,
        cost_services:  service.cost_services ,
        more_info: service.more_info
      };
      console.log(updatedService)
      this.userService.updateServicesSpecialist(service.id,updatedService).subscribe(
        (response) => {
          console.log('Service updated successfully:', response);
          location.reload();
        },
        (error) => {
          // Обработка ошибки при обновлении данных
          console.error('Error updating service:', error);
          // Возможно, вы захотите откатить изменения или предпринять другие действия
        }
      );
    } else {
      // Вход в режим редактирования
      service.time_services = service.updatedTime ;
      service.cost_services = service.updatedCost;
      service.more_info = service.updatedInfo;
      this.editServiceSpecialist = true;
      this.selectedService = service;
    }

  }

  private updateCalendar() {
    for (const order of this.calendarOrderData) {
      const orderDate = new Date(order.date_time); // Предполагается, что в данных есть поле 'date', содержащее дату заказа
      const calendarDay = this.calendar.find(day => day.date.setHours(0, 0, 0, 0) === orderDate.setHours(0, 0, 0, 0));
      if (calendarDay) {
        calendarDay.title = order.id_order_specialist; // Предполагается, что в данных есть поле 'orderNumber', содержащее номер заказа
      }
    }
  }

  private generateCalendarDays(monthIndex: number): void {

    this.calendar = [];
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    this.displayMonth = this.monthNames[day.getMonth()];
    let startingDateOfCalendar = this.getStartDateForCalendar(day);
    let dateToAdd = startingDateOfCalendar;
    for (var i = 0; i < 31; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }
  private getStartDateForCalendar(selectedDate: Date){
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(1));
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }
  public showCalendarControls() {
    this.showControls = true;
  }

  public hideCalendarControls() {
    this.showControls = false;
  }

  public showOrdersControls() {
    this.showControlsOrder = true;
  }

  public hideOrdersControls() {
    this.showControlsOrder = false;
  }

  deletePortfolio(id:any){
    return this.specialistService.deletePortfolio(id)
    location.reload()
  }

  getServiceSpecialist(id:any ){
    return this.specialistService.getServiceSpecialistId(id).subscribe((specialist_services) => {
      console.log(specialist_services);
      this.specialist_services = specialist_services;
    });
  }

  reload(){
    location.reload()
  }


  public editService(service: any) {


  }

  updateSpecialist():void{
    const userId = this.tokenService.getUserId();
    this.userService.getSpecialist(userId).subscribe(
      data => {
        const userId = data.id;
        console.log(userId,  this.specialistData)
        this.specialistService.updateSpecialist(userId, this.specialistData)
          .subscribe(
            response => {
              console.log('updated successfully');
              location.reload()
            },
            error => {
              console.error('Error', error);
            }
          );

      },
      error => {
        console.log(error);
      }
    );

  }

  public deleteService(service_id: any): void {
    this.specialistService.deleteServiceSpecialist(service_id)
      .subscribe(
        () => {
          console.log('Услуга специалиста успешно удалена');
          location.reload();
        },
        (error) => {
          console.error('Ошибка при удалении услуги специалиста:', error);
        }
      );
  }

  handleFileInput(event: any) {
    this.filesToUpload = event.target.files;
  }

  uploadFiles(service: any) {
    const serviceId = service.id; // Assuming service has an 'id' property

    this.specialistService.updatePortfolio(serviceId, this.filesToUpload).subscribe(
      (response) => {
        console.log('Portfolio updated successfully:', response);
        location.reload()
      },
      (error) => {
        console.error('Error updating portfolio:', error);
      }
    );

    this.showFileInput = false;
    this.filesToUpload = [];
  }

  viewPortfolio(service: any) {
    if (this.showPortfolio && this.selectedService === service) {
      this.showPortfolio = false;
      this.selectedService = null;
    } else {
      this.showPortfolio = true;
      this.selectedService = service;
    }
  }

  onFilePicked(event: Event): void {
    console.log(event);
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileObj = fileInput.files[0];
      console.log(this.fileObj);
    }
  }
  onFileUpload() {
    if (!this.fileObj) {
      return
    }
    const userId = this.tokenService.getUserId();
    this.userService.getSpecialist(userId).subscribe(
      async data => {
        this.user = data;
        console.log(this.user);
        const id = this.user.id
        console.log(id)
        const fileForm = new FormData();
        console.log(this.fileObj);
        fileForm.append('file', this.fileObj);
        const foundFile = fileForm.get('file');
        console.log(foundFile);
        this.userService.updateSpecialistPhoto(id,fileForm).subscribe(res => {
          console.log('Specialist updated successfully');
        });
        alert('Successful');
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePhoto(){
    const userId = this.tokenService.getUserId();
    this.userService.getSpecialist(userId).subscribe(
      async data => {
        this.user = data;
        console.log(this.user);
        const id = this.user.id
        this.userService.deleteSpecialistPhoto(id) .subscribe(
          () => {
            console.log('Specialist photo delete');
            alert('Successful');
            location.reload();
          },
          error => {
            console.error('Error: ', error);
            alert('Error: ' + error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }


}

