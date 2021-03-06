import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {PostDTO} from "@shared/models/dto/PostDTO";

const API_URL = environment.apiUrl;


@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {
  }
  getPostsByTopic(id: Number): Observable<any> {
    return this.http.get(`${API_URL}/topics/` + id + `/withUsers`);
  }

  deleteTopicByTitle(topicName: string) {
    const params = {
      topicTitle: topicName
    };
    return this.http.put<any>(`${API_URL}/topics/delete`, null, {params});
  }


  isTopicAuthor(authorId: number): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/topics/` + authorId + `/isAuthor`);
  }

  saveNewPost(postDTO: PostDTO) {
    return this.http.post(`${API_URL}/posts/createPost`, postDTO);
  }


}

