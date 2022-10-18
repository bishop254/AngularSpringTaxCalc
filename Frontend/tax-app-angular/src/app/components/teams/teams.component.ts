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
      img: '/karanja.jpg',
      desc: 'Love solving chllenges with code',
    },
    {
      name: 'Mary Wanjiku',
      title: 'Backend Developer',
      img: 'team/mary.jpg',
      desc: 'Passionate about Java & SpringBoot',
    },
    {
      name: 'Robert G Githinji',
      title: 'Full Stack Developer',
      img: 'rob.jpg',
      desc: 'I am a passionate software developer looking forward to grow my skills and contribute to Natujenge community',
    },
    {
      name: 'Adam Ibrahim',
      title: 'Frontend Developer',
      img: '/Adam.jpg',
      desc: 'I am a passionate software developer looking forward to grow my skills and contribute to Natujenge community',
    },
    {
      name: 'Steve Wakhungu',
      title: 'Frontend Developer',
      img: '/Steve.jpeg',
      desc: 'A lifelong learner; currently learning web development.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
