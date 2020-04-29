import { NgModule } from '@angular/core';

import{
    MatCardModule, 
    MatButtonModule, 
    MatListModule, 
    MatIconModule, 
    MatProgressBarModule, 
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports:[
        MatCardModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        MatSnackBarModule
        
    ],
    exports:[
        MatCardModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        MatSnackBarModule

    ]
})

export class MaterialModule{}