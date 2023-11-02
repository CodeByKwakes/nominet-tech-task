import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Nameserver } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #apiUrl = 'http://localhost:3000';
  readonly #http = inject(HttpClient);

  getAllNameservers(): Observable<Nameserver[]> {
    return this.#http.get<Nameserver[]>(`${this.#apiUrl}/nameservers`);
  }

  addNameserver(nameserver: Nameserver): Observable<Nameserver> {
    return this.#http.post<Nameserver>(
      `${this.#apiUrl}/nameservers`,
      nameserver
    );
  }
}
