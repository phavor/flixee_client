import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { AdminInputService } from "src/app/services/admin-input.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {

  name: string = "";
  released: string = "";
  runtime: string = "";
  genre: string = "";
  director: string = ""
  writer: string = ""
  actors: string = "";
  plot: string = "";
  language: string = "";
  country: string = "";
  awards: string = ""

  id: string = "";
  store: any = {};

  movies: any[] = [];
  showWait: boolean = false;

  fileToUpload: File = null; // hold our file
  imageUrl: string = "";
  originalWidth: string = "";

  constructor(
    private admin: AdminInputService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allMovies();
  }



  openInput() {
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }

  fileChange(files: FileList) {
    if (files.length > 0) {
      this.fileToUpload = files[0];
      var readers = new FileReader();
      readers.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      readers.readAsDataURL(this.fileToUpload);
    }
  }

  allMovies() {
    this.admin.getMovies().subscribe((data: any) => {
      if (data.success) {
        this.movies = data.movies;
        // console.log(this.movies)
      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }

    });
  }

  addMovie() {
    let movie = {
      name: this.name,
      released: this.released,
      runtime: this.runtime,
      genre: this.genre,
      director: this.director,
      writer: this.writer,
      actors: this.actors,
      plot: this.plot,
      language: this.language,
      country: this.country,
      awards: this.awards,
    };

    this.showWait = true

    this.admin.addMovie(movie).subscribe((data: any) => {
      if (data.success) {
        this.admin.movieImage(this.fileToUpload, data.movie._id).subscribe(imagedata => {
          if (imagedata) {
            this.allMovies();
            this.clear();
            this.imageUrl = ""
            this.showWait = false

            document.getElementById('add').click();
            this.toastr.success("Successfully.", "The movie has been added.", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.warning("Movie was added but image was not uploaded.", "Oops.", {
              timeOut: 3000
            });
          }

        })

      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }
    });
  }

  getId(id) {
    this.id = id;
    console.log(this.id)
  }


  deleteMovie() {
    this.showWait = true;
    this.admin.deleteMovie(this.id).subscribe((data: any) => {
      if (data.success) {
        this.allMovies();
        this.showWait = false;
        document.getElementById('del').click();
        this.id = "";
        this.toastr.success("Successfully.", "The movie has been deleted.", {
          timeOut: 3000
        });
      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }
    });
  }

  storeMovie(movie) {
    this.id = movie._id;
    this.name = movie.name;
    this.released = movie.released;
    this.runtime = movie.runtime;
    this.genre = movie.genre;
    this.director = movie.director;
    this.writer = movie.writer;
    this.actors = movie.actors;
    this.plot = movie.plot;
    this.language = movie.language;
    this.country = movie.country;
    this.awards = movie.awards;
  }

  updateMovie() {
    let movie = {
      _id: this.id,
      name: this.name,
      released: this.released,
      runtime: this.runtime,
      genre: this.genre,
      director: this.director,
      writer: this.writer,
      actors: this.actors,
      plot: this.plot,
      language: this.language,
      country: this.country,
      awards: this.awards,
    };
    this.showWait = true;
    this.admin.updateMovie(movie).subscribe((data: any) => {
      if (data.success) {
        this.allMovies();
        this.clear();
        this.showWait = false;

        document.getElementById('upd').click();
        this.toastr.success("Successfully.", "The movie has been updated.", {
          timeOut: 3000
        });
      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }
    });
  }

  viewMovie(id) {
    this.router.navigate(['/admin/movie/' + id])
  }

  clear() {
    this.id = "";
    this.name = "";
    this.released = "";
    this.runtime = "";
    this.genre = "";
    this.director = ""
    this.writer = ""
    this.actors = "";
    this.plot = "";
    this.language = "";
    this.country = "";
    this.awards = "";
  }
}
