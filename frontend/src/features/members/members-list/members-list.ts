import { Member } from './../../../interfaces/member';
import { map, Observable } from 'rxjs';
import { MemberService } from './../../../core/services/member-service';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from '../member-card/member-card';

@Component({
  imports: [AsyncPipe, MemberCard],
  selector: 'app-members-list',
  styleUrl: './members-list.css',
  templateUrl: './members-list.html',
})
export class MembersList {
  private memberService = inject(MemberService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.memberService.getMembers();
  }
}
