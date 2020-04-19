import { NgModule } from '@angular/core';

import{
    MatCardModule, MatButtonModule, MatListModule, MatIconModule
} from '@angular/material';

@NgModule({
    imports:[
        MatCardModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIconModule
        
    ],
    exports:[
        MatCardModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIconModule
    ]
})

export class MaterialModule{}