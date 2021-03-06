import {AuthService} from './../../../../core/services/auth.service';
import {TopicsService} from '@shared/services/topics.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import {DialogService} from '@shared/services/dialog.service';
import {TopicPaginationDto} from '@app/shared/models/dto/TopicPaginationDto';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  topics: TopicPaginationDto [] = [];
  resultsLength = 0;
  categoryId: number;
  pinnedTopics: TopicPaginationDto [] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activatedRouter: ActivatedRoute, private topicsService: TopicsService,
              private router: Router, private dialogService: DialogService, private authService: AuthService) {
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.categoryId = params['id'];
    });

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = 10;
    this.handleTableChanges(this.categoryId);
    this.handleTableChangesPinned(this.categoryId);
  }

  private getListTopics(id: number) {
    this.topicsService.getTopicsByCategory(id).subscribe((topics: any) => {
      this.topics = topics.content;
    });
  }

  private handleTableChanges(id: number) {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          const params = {
            sort: `topicCreatedDate,desc`,
            page: this.paginator.pageIndex + '',
            size: this.paginator.pageSize + ''
          };

          return this.topicsService.getTopicsByCategory(id, params);
        }),
        map((data: any) => {

          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(data => this.topics = data);
  }

  private handleTableChangesPinned(id: number) {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          const params = {
            sort: `topicCreatedDate,desc`,
            page: this.paginator.pageIndex + '',
            size: this.paginator.pageSize + ''
          };

          return this.topicsService.getPinnedTopicsByCategory(id, params);
        }),
        map((data: any) => {

          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(data => this.pinnedTopics = data);
  }

  getPosts(topicId: number) {
    this.router.navigate([`home/categories/`, this.categoryId, `topics`, topicId]);
  }

  openNewTopicDialog() {
    this.dialogService.openNewTopicDialog(this.categoryId);
  }

  pinTopic(topicId: number) {
    this.topicsService.pinTopic(topicId).subscribe((resp: any) => {
      this.handleTableChanges(this.categoryId);
      this.handleTableChangesPinned(this.categoryId);
    });
  }

  unpinTopic(topicId: number) {
    this.topicsService.unPinTopic(topicId).subscribe((resp: any) => {
      this.handleTableChanges(this.categoryId);
      this.handleTableChangesPinned(this.categoryId);
    });
  }
  isAdmin() {
    return this.authService.isAdmin();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  redirectBack() {
    this.router.navigate([`home`]);
  }

  goToUserProfile(username: string) {
    this.router.navigate([`/home/profile`, username]);
  }
}
