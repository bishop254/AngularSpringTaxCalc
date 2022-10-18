import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  team = [
    {
      name: 'Karanja Chiuri',
      title: 'Frontend Developer',
      img: 'https://github.com/bishop254/AngularSpringTaxCalc/blob/main/Frontend/tax-app-angular/src/assets/team/karanja.jpg?raw=true',
      desc: 'Love solving chllenges with code',
    },
    {
      name: 'Mary Wanjiku',
      title: 'Backend Developer',
      img: 'https://github.com/bishop254/AngularSpringTaxCalc/blob/main/Frontend/tax-app-angular/src/assets/team/mary.jpg?raw=true',
      desc: 'Passionate about Java & SpringBoot',
    },
    {
      name: 'Steve Wakhungu',
      title: 'Frontend Developer',
      img: 'https://github.com/bishop254/AngularSpringTaxCalc/blob/main/Frontend/tax-app-angular/src/assets/team/Steve.jpeg?raw=true',
      desc: 'A lifelong learner; currently learning web development.',
    },
    {
      name: 'Robert G Githinji',
      title: 'Full Stack Developer',
      img: 'https://github.com/bishop254/AngularSpringTaxCalc/blob/main/Frontend/tax-app-angular/src/assets/team/rob.jpg?raw=true',
      desc: 'I am a passionate software developer looking forward to grow my skills and contribute to Natujenge community',
    },
    {
      name: 'Adam Ibrahim',
      title: 'Frontend Developer',
      img: 'https://github.com/bishop254/AngularSpringTaxCalc/blob/main/Frontend/tax-app-angular/src/assets/team/Adam.jpg?raw=true',
      desc: 'I have experience in HTML, CSS, and JavaScript. Combined with my recent internship in front-end web development, I am confident I have the skills to help Natujenge Community succeed.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
