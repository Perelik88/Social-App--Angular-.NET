import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Member, MemberEdit } from '../../interfaces/member';
import { Photo } from '../../interfaces/photo';

@Service()
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  public editMode = signal(false);
  public member = signal<Member | undefined>(undefined);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + '/members');
  }

  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + '/members/' + id);
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + '/members/' + id + '/photos');
  }

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(this.baseUrl + '/members/add-photo', formData);
  }

  updateMember(member: MemberEdit) {
    return this.http.put(this.baseUrl + '/members', member);
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + '/members/set-main-photo/' + photo.id, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + '/members/delete-photo/' + photoId);
  }
}
