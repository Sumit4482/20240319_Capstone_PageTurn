import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import countries from '../../constants/countries';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import tags from '../../constants/tags';
@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [NavbarComponent,CommonModule,ReactiveFormsModule]
})
export class ProfileComponent {
  countries: string[] = countries;
  userData: any;
  updateForm: FormGroup;
  showUpdateForm: boolean = false;
  genres: string[] = tags;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['',],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      interests: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserDetails(token).subscribe(
        (response) => {
          this.userData = response;
          console.log(this.userData);
          
          this.populateUpdateForm();
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  populateUpdateForm(): void {
    this.updateForm.patchValue({
      fullName: this.userData.fullName,
      email: this.userData.email,
      dob: this.userData.dob,
      gender: this.userData.gender,
      country: this.userData.country,
      interests: this.userData.interests
    });
  }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
    if (this.showUpdateForm) {
      this.populateUpdateForm();
    }
  }

  submitUpdateForm(): void { 
    if (this.updateForm.valid) {
      const token = this.authService.getToken();
      if (token) {
        const updatedData = this.updateForm.value;
        this.userService.updateUserProfile(token, updatedData).subscribe(
          (response) => {
            console.log('Profile updated successfully:', response);
            this.userData = response;
            this.showUpdateForm = false;
            this.ngOnInit();
          },
          (error) => {
            console.error('Error updating profile:', error);
          }
        );
      }
    }
  }
}
