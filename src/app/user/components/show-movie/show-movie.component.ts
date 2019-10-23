import { Component, OnInit } from '@angular/core';
import { AdminInputService } from 'src/app/services/admin-input.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})
export class ShowMovieComponent implements OnInit {

  movie: any = {};
  url: string = ''

  constructor(
    private admin: AdminInputService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Combine them both into a single observable
    const urlParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    // Subscribe to the single observable, giving us both
    urlParams.subscribe(routeParams => {
      // routeParams containing both the query and route params
      this.getMovie(routeParams.id);
    });
  }


  getMovie(id) {
    this.admin.getAMovie(id).subscribe((data: any) => {
      if (data.success) {
        this.movie = data.movie;

        this.url = this.movie.image.url;
        // console.log(this.movie)
      }
    });
  }

}
