import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/Domain/data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges {
  @Input() userData: any = []
  @Input() newUser: boolean = false
  @Output() closeForm = new EventEmitter()

  form: FormGroup;


  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      company: [''],
      testimonial: [''],
      rating: [0],
      date: ['']
    });
  }


  ngOnChanges() {
    if (!this.newUser) {
      this.form.patchValue(this.userData);
    }
  }

  onClose() {
    this.closeForm.emit()
    this.form.reset();
  }


  onSubmit() {
    const updatedData = this.form.value;
    if (this.newUser) {
      this.dataService.create(updatedData)
      .subscribe(() => {
        this.onClose();
      })

    } else {
      this.dataService.update(updatedData.id, updatedData)
      .subscribe(() => {
        this.onClose();
      })
    }

  }

}
